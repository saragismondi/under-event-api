const { Router } = require("express");
<<<<<<< HEAD
const { getAllEvent, postEvent, getByTitle, getIdDb, getByState } = require("../controllers/controllersClients");
const {payment} = require('../controllers/Stripe')
=======

const {
  getAllEvent,
  postEvent,
  getByTitle,
  getIdDb,
  getByState,
  solocitys,
  putEvent,
} = require("../controllers/controllersClients");
>>>>>>> dev

const router = Router();

router.get("/getAll", getAllEvent);
router.post("/createEvent", postEvent);
router.get("/getTitle", getByTitle);
router.get("/getStates", getByState);
router.get("/:id", getIdDb);

<<<<<<< HEAD

router.post("/payment", payment )
=======
router.put("/putEvent/:id", putEvent);

router.get("/getCities", solocitys);
>>>>>>> dev

module.exports = router;
