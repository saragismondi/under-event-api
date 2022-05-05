const { Router } = require("express");

const { putEvent, getAllEvent, postEvent, getByTitle, getIdDb, getByState, solocitys, getEventsDb, soloGeneros  } = require("../controllers/controllersClients");








const router = Router();
router.get("/sologeneros", soloGeneros)
router.get("/getAll", getEventsDb);
router.get("/solocitys", solocitys);

router.post("/createEvent", postEvent);
router.get("/getTitle", getByTitle);
router.get("/getStates", getByState);
router.get("/:id", getIdDb);


router.put("/putEvent/:id", putEvent);



module.exports = router;
