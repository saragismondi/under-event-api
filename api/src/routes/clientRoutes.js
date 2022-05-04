const { Router } = require("express");
const { getAllEvent, postEvent, getByTitle, getIdDb, getByState, putEvent } = require("../controllers/controllersClients");

const router = Router();

router.get("/getAll", getAllEvent);
router.post("/createEvent", postEvent);
router.get("/getTitle", getByTitle);
router.get("/getStates", getByState);
router.get("/:id", getIdDb);
router.put("/putEvent/:id", putEvent);

module.exports = router;
