const { User, Order, Ticket, Event } = require("../db");

const findUserOrders = async (userId) => {
  try {
    const orders = await Order.findAll({
      where: {
        UserId: userId,
      },
      include: [{ model: Ticket }, { model: Event }],
    });
    return orders;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  findUserOrders,
};
