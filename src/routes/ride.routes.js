const { createRide, getRides } = require("../controllers/ride.controller");

const router = require("express").Router();

router.route("/").post(createRide).get(getRides);

module.exports = router;
