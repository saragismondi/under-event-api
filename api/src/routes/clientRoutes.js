const { Router } = require("express");
const { getAllEvent, postEvent, getByTitle } = require("../controllers/controllersClients");

const router = Router();

router.get("/getAll", getAllEvent);
router.post("/createEvent", postEvent);
router.get("/getTitle", getByTitle)

module.exports = router;
