const express = require('express');
const router = express.Router();
const logic = require('../services/AdminFacade');

/* GET data Admin */
router.get("/", async function(req, res, next) {
    try {
        res.json(await logic.getAdmin(req.query.page));
    } catch (err) {
        console.log('Error while getting Admin');
        next(err);
    }
});

/* POST Create Admin */
router.post("/", async function(req, res, next) {
    try {
        res.json(await logic.insertAdmin(req.body));
    } catch (err) {
        console.log("Error while creating Admin");
        next(err);
    }
});

/* POST Update Admin */
router.post("/:id", async function(req, res, next) {
    try {
        res.json(await logic.updateAdmin(req.params.id, req.body));
    } catch (err) {
        console.error("Error while updating Admin");
        next(err);
    }
});

/*PUT Delete Admin */
router.put("/:id", async function(req, res, next) {
    try {
        res.json(await logic.removeAdmin(req.params.id));
    } catch (err) {
        console.error("Error while deleting Admin");
    }
});

module.exports = router;