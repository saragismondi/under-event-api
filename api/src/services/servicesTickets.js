const { Order, Ticket, Event } = require("../db");

const findTicketsByOrderId = async (orderId) => {
  try {
    const tickets = await Ticket.findAll({
      where: {
        OrderId: orderId,
      },
      include: [{ model: Event }],
    });
    return tickets;
  } catch (error) {
    console.log(error);
  }
};

const updateTicketsStatusByOrderId = async (status, orderId) => {
  try {
    await Ticket.update({ status: status }, { where: { OrderId: orderId } });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  findTicketsByOrderId,
  updateTicketsStatusByOrderId,
};
