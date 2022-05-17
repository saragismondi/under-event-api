const { Order, User, Ticket } = require("../db");

const createOrder = async (order) => {
  try {
    const user = await User.findOne({
      where: {
        email: order.email,
      },
    });

    const newOrder = await user.createOrder({
      status: "Pending",
      date: new Date().toString(),
      quantity: order.quantity,
      totalPrice: order.totalPrice,
    });

    for (var j = 0; j < order.eventos.length; j++) {
      for (var i = 0; i < order.eventos[j].cantidad; i++) {
        const encuentroTickets = await Ticket.findOne({
          where: {
            status: "Disponible",
            EventId: order.eventos[j].id,
          },
        });
        await newOrder.addTickets(encuentroTickets);
        encuentroTickets.status = "Reservado";
        await encuentroTickets.save(); // aca actualizo el estado del ticket
      }
    }

    const orderRes = await Order.findByPk(newOrder.id, {
      include: [{ model: Ticket }, { model: User }],
    });

    return orderRes;
  } catch (error) {
    console.log(error);
  }
};

const updateOrderStatus = async (orderId, status) => {
  try {
    const order = await Order.findByPk(orderId);
    order.status = status;
    await order.save();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createOrder,
  updateOrderStatus,
};
