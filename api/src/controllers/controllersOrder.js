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
const updateOrder = async (req, res) => {
  const { status, orderId } = req.body;
  try {
    const order = await Order.findByPk(orderId);
    order.status = status;
    await order.save();
    res.json({ msg: "Order updated" });
  } catch (error) {
    console.log(error);
  }
}
 /////////////////////////////////////////////////
 const getOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await Order.findByPk(orderId, {
      include: [{ model: Ticket }, { model: User }],
    });
    res.json({ order });
  } catch (error) {
    console.log(error);
  }
}; 
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
}
/////////////////////////////////////////////////
  const updateOrderStripe = async (req, res) => {
  const { status, orderId } = req.body;
  try {
    const order = await Order.findByPk(orderId);
    order.status = status;
    await order.save();
    res.json({ msg: "Order updated" });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createOrder,
  updateOrder,
  getOrder,
  getOrders
};
