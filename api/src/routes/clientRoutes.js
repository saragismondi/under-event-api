const { Router } = require("express");
const { postEvent, getByTitle, getIdDb, getByState, solocitys, getEventsDb  } = require("../controllers/controllersClients");

const router = Router();

router.get("/getAll", getEventsDb);
router.get("/solocitys",solocitys)
router.post("/createEvent", postEvent);
router.get("/getTitle", getByTitle);
router.get("/getStates", getByState);
router.get("/:id", getIdDb);

module.exports = router;
