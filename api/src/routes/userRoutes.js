const { Router } = require("express");


//const { postUser } = require("../controllers/controllersUser");
// const { addCart } = require("../controllers/carrito/addCart");

const {
  postUser,
  getUser,
  updateUser,
  
} = require("../controllers/controllersUser");


const {
 createOrder
  
} = require("../controllers/controllersOrder");

const router = Router();

router.post("/createUser", postUser);

 router.post("/newOrder", createOrder);

router.get("/:externalId", getUser);
router.put("/:externalId", updateUser);



module.exports = router;
