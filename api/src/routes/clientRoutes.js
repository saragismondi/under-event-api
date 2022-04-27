const { Router } = require("express");
const { getAllEvent } = require("../controllers/controllersClients");

const router = Router();

router.get("/getAll", getAllEvent);

module.exports = router;
