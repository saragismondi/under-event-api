const { Router } = require("express");
<<<<<<< HEAD
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
=======

const { putEvent, postEvent, getByTitle, getIdDb, getByState, solocitys, getEventsDb, soloGeneros, getEventsByDate, datesEvent  } = require("../controllers/controllersClients");


//nueva config de indice de rutas: las de arriba agregue una / al ultimo porfi 
>>>>>>> dev





const router = Router();
router.get("/sologeneros/", soloGeneros)
router.get("/getAll/", getEventsDb);
router.get("/solocitys/", solocitys);
router.post("/createEvent/", postEvent);
router.get("/getTitle", getByTitle);
router.get("/getStates/", getByState);
router.get("/getDates/", datesEvent );
// y las rutas de params agregar luego de esta linea en orden descendente de entradas (como esta ahora) 


router.post("/payment", payment )

router.put("/putEvent/:id", putEvent);
router.get("/getEvents/:date", getEventsByDate);
router.get("/:id", getIdDb);



module.exports = router;
