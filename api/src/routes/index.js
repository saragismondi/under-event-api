const { Router } = require("express");
const event = require("./clientRoutes");

const router = Router();

router.use("/events", event);


module.exports = router;
