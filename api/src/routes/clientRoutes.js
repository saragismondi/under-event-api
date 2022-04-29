const { Router } = require("express");
const { getAllEvent, postEvent, getByTitle, getIdDb } = require("../controllers/controllersClients");

const router = Router();

router.get("/getAll", getAllEvent);
router.post("/createEvent", postEvent);
router.get("/getTitle", getByTitle);
router.get("/:id", getIdDb);

module.exports = router;
