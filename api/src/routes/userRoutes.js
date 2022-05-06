const { Router } = require("express");

const {
  postUser,
  getUser,
  updateUser,
} = require("../controllers/controllersUser");

const router = Router();

router.post("/createUser", postUser);
router.get("/:externalId", getUser);
router.put("/:externalId", updateUser);

module.exports = router;
