const { Router } = require("express");

const { postUser } = require("../controllers/controllersUser");
// const { addCart } = require("../controllers/carrito/addCart");

const router = Router();

router.post("/createUser", postUser);
// router.post("/card", addCart);

module.exports = router;
