const { Router } = require("express");
const {payment} = require('../controllers/Stripe')
const {
  getAllEvent,
  postEvent,
  getByTitle,
  getIdDb,
  getByState,
  solocitys,
  putEvent,
} = require("../controllers/controllersClients");





const router = Router();

router.get("/getAll", getAllEvent);
router.post("/createEvent", postEvent);
router.get("/getTitle", getByTitle);
router.get("/getStates", getByState);
router.get("/:id", getIdDb);


router.post("/payment", payment )

router.put("/putEvent/:id", putEvent);

router.get("/getCities", solocitys);


module.exports = router;
