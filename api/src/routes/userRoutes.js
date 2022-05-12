const { Router } = require("express");

// const { addCart } = require("../controllers/carrito/addCart");

const {
  postUser,
  getUser,
  updateUser,
  getAllUsers,
  banUser,
} = require("../controllers/controllersUser");

const {
  createOrder,
  getOrderById,
  getOrders,
  getAllOrders,
  deleteOrder,
  updateOrder,
} = require("../controllers/controllersOrder");

const { addReview, getReviews, deleteReview } = require("../controllers/controllersReviews");

const router = Router();

router.get("/getReviews/:id/", getReviews);
router.delete("/deleteReview/:id", deleteReview);
router.post("/createReview/:id", addReview);
router.post("/createUser", postUser);
router.get("/getAllOrders", getAllOrders);
router.post("/newOrder", createOrder);
router.delete("/deleteOrder/:orderId", deleteOrder);
router.get("/getOrder/:orderId", getOrderById);
router.put("/updateOrder/:orderId", updateOrder);
router.get("/getOrders/:email", getOrders);

router.get("/:externalId", getUser);
router.put("/:externalId", updateUser);
router.get("/", getAllUsers);
router.post("/ban", banUser);

module.exports = router;
