const { Event, User, Order, Ticket } = require("../db");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

const createOrder = async (req, res) => {
  try {
    const { email, eventos, quantity, totalPrice } = req.body;

    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    const order = await user.createOrder({
      status: "Pending",
      date: new Date().toString(),
      quantity: quantity,
      totalPrice: totalPrice,
    });

    for (var j = 0; j < eventos.length; j++) {
      for (var i = 0; i < eventos[j].cantidad; i++) {
        const encuentroTickets = await Ticket.findOne({
          where: {
            status: "Disponible",
            EventId: eventos[j].id,
          },
        });
        await order.addTickets(encuentroTickets);
        encuentroTickets.status = "Reservado";
        await encuentroTickets.save(); // aca actualizo el estado del ticket
      }
    }

    const orderRes = await Order.findByPk(order.id, {
      include: [{ model: Ticket }, { model: User }],
    });

    res.json({ msg: "Orden Creada", orderRes });
  } catch (error) {
    console.log(error);
  }
};

 /////////////////////////////////////////////////

 // RUTA DE ORDEN POR ID
 
  
/////////////////////////////////////////////////
  const getOrders = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
      include: [{ model: Order }],
    });
    res.json({ user });
  } catch (error) {
    console.log(error);
  }
};
/////////////RUTA QUE ME DEVUELVE TODAS LAS ORDENES
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
    
      include: [{ model: Ticket }, { model: User }],
    });
    res.json({ orders });
  } catch (error) {
    console.log(error);
  }
}
const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const order = await Order.findByPk(orderId, {
      where: {
        id: orderId,
      },
      include: [{ model: Ticket }, { model: User }],
    });
    console.log(req.params)
    res.json({order});
    console.log(order, "soy la orden")
  } catch (error) {
    console.log(error);
  }
};
// crear ruta para borrar una orden
const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findByPk(orderId);
    await order.destroy();
    res.json({ msg: "Orden Eliminada" });
  } catch (error) {
    console.log(error);
  }
}
// crear ruta para actualizar una orden
const updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await Order.findByPk(orderId);
    order.status = status;
    await order.save();
    res.json({ msg: "Orden Actualizada" });
  } catch (error) {
    console.log(error);
  }
}


module.exports = {
  createOrder,
  getOrderById,
  getOrders,
  getAllOrders,
  deleteOrder,
  updateOrder,
};
