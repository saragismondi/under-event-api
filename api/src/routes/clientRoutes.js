const { Router } = require("express");
const { getAllEvent, postEvent } = require("../controllers/controllersClients");

const router = Router();

router.get("/getAll", getAllEvent);
router.post("/createEvent", postEvent);

module.exports = router;
