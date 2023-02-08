const express = require('express');
const router = express.Router();
const logic = require('../services/NazhirFacade');

/* GET data Nazhir */
router.get("/", async function(req, res, next) {
    try {
        res.json(await logic.getNazhir(req.query.page));
    } catch (err) {
        console.log('Error while getting Nazhir');
        next(err);
    }
});

/* POST Create Nazhir */
router.post("/", async function(req, res, next) {
    try {
        res.json(await logic.insertNazhir(req.body));
    } catch (err) {
        console.log("Error while creating Nazhir");
        next(err);
    }
});

/* POST Update Nazhir */
router.post("/:id", async function(req, res, next) {
    try {
        res.json(await logic.updateNazhir(req.params.id, req.body));
    } catch (err) {
        console.error("Error while updating Nazhir");
        next(err);
    }
});

/*PUT Delete Nazhir */
router.put("/:id", async function(req, res, next) {
    try {
        res.json(await logic.removeNazhir(req.params.id));
    } catch (err) {
        console.error("Error while deleting Nazhir");
    }
});

module.exports = router;