const express = require('express');
const router = express.Router();
const logic = require('../services/TypeFacade');

/* GET data Type */
router.get("/", async function(req, res, next) {
    try {
        res.json(await logic.getType(req.query.page));
    } catch (err) {
        console.log('Error while getting Type');
        next(err);
    }
});

/* POST Create Type */
router.post("/", async function(req, res, next) {
    try {
        res.json(await logic.insertType(req.body));
    } catch (err) {
        console.log("Error while creating Type");
        next(err);
    }
});

/* POST Update Type */
router.post("/:id", async function(req, res, next) {
    try {
        res.json(await logic.updateType(req.params.id, req.body));
    } catch (err) {
        console.error("Error while updating Type");
        next(err);
    }
});

/*PUT Delete Type */
router.put("/:id", async function(req, res, next) {
    try {
        res.json(await logic.removeType(req.params.id));
    } catch (err) {
        console.error("Error while deleting Type");
    }
});

module.exports = router;