const { Router } = require("express");
const event = require("./clientRoutes");
const user = require("./userRoutes");

const router = Router();

router.use("/events", event);
router.use("/users", user);

module.exports = router;
