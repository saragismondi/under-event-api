const { Router } = require("express");

const { postUser } = require("../controllers/controllersUser");

const router = Router();

router.post("/createUser", postUser);

module.exports = router;
