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
        await encuentroTickets.save(); // aca actualizzo el estado del ticket
      }
    }

    const orderRes = await Order.findByPk(order.id, {
      include: [{ model: Ticket }, { model: User }],
    });

    res.json({ msg: " Evento Creado", orderRes });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createOrder };
