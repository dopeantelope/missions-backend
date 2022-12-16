const express = require("express");
const router = express.Router();
const missionsController = require("../controllers/missions");


router.get("/", missionsController.getMission);

module.exports = router;
