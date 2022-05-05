const { Router } = require("express");
const { getAllEvent, postEvent, getByTitle, getIdDb, getByState } = require("../controllers/controllersClients");
const {payment} = require('../controllers/Stripe')

const router = Router();

router.get("/getAll", getAllEvent);
router.post("/createEvent", postEvent);
router.get("/getTitle", getByTitle);
router.get("/getStates", getByState);
router.get("/:id", getIdDb);


router.post("/payment", payment )

module.exports = router;
