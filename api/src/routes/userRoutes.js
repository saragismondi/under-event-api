const { Router } = require("express");


const { postUser } = require("../controllers/controllersUser");
// const { addCart } = require("../controllers/carrito/addCart");

const {
  postUser,
  getUser,
  updateUser,
} = require("../controllers/controllersUser");


const router = Router();

router.post("/createUser", postUser);

// router.post("/card", addCart);

router.get("/:externalId", getUser);
router.put("/:externalId", updateUser);


module.exports = router;
