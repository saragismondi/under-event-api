const Stripe = require("stripe")(process.env.SECRET_KEY);
const { User, Order, Ticket, Event } = require("../db");
const { sendEmail } = require("./sendEmail/sendEmail");
const { createOrder, updateOrderStatus } = require("../services/servicesOrder");
const {
  findTicketsByOrderId,
  updateTicketsStatusByOrderId,
} = require("../services/servicesTickets");

const mailSucces = {
  title: "compra exitosa",
  buttonLink: "https://under-event-client.vercel.app/",
  buttonText: " Mira mas Eventos ",
  noteMessage: "No compartas estos Tickets son de uso exclusivo para ti",
};
const mailFail = {
  title: "compra rechazada",
  message: "Intenta de nuevo en nuestra web wwww.underevent.com",
  buttonLink: "https://under-event-client.vercel.app/",
  buttonText: "Mira mas Eventos ",
  noteMessage: "Puedes reintentar la compra con el carrito de compras",
};

const payment = async (req, res) => {
  let status, error;
  const { token, amount, orderData } = req.body; // aca tengo que poner el orderId
  console.log(token, "hola soy el TOKEN");
  let orderId;
  let orderNew;
  try {
    const order = await createOrder(orderData);
    orderNew = order;
    orderId = order.id;
    console.log(order, "order");

    await Stripe.charges.create({
      source: token.id,
      amount: amount * 100,
      currency: "ARS",
    });

    await updateOrderStatus(order.id, "Approved");

    await updateTicketsStatusByOrderId("Vendido", order.id)
      .then(() => {
        console.log("tickets actualizados");
      })
      .catch(() => {
        console.log("error al actualizar tickets");
      });

    const encuentroTickets = await findTicketsByOrderId(order.id);

    mailSucces.message = encuentroTickets
      .map((e) => {
        console.log(e.Event);
        return [
          "<h3>Evento: </h3>",
          "<h1>" + e.Event.dataValues.title + "</h1>",
          "Fecha: ",
          e.Event.dataValues.date,
          "Lugar: ",
          e.Event.dataValues.location,
          "Tu entrada: ",
          e.dataValues.id,
        ];
      })
      .join("\n");

    const encuentroUsuario = await User.findByPk(order.UserId);

    mailSucces.message = encuentroTickets
      .map((e) => {
        return [
          "<h3>Evento: </h3>",
          "<h1>" + e.Event.dataValues.title + "</h1>",
          "Fecha: ",
          e.Event.dataValues.date,
          "Lugar: ",
          e.Event.dataValues.location,
          "Tu entrada: ",
          e.dataValues.id,
        ];
      })
      .join("\n");

    const emailDeUsuario = encuentroUsuario.dataValues.email;

    sendEmail(emailDeUsuario, mailSucces);
    status = "success";
    console.log(emailDeUsuario);
  } catch (error) {
    await updateOrderStatus(orderId, "Rejected");

    await console.log(error);

    const encuentroUsuario = await User.findByPk(orderNew.UserId);
    const emailDeUsuario = encuentroUsuario.dataValues.email;
    sendEmail(emailDeUsuario, mailFail);
    status = "Failure"; // PARA PROBAR ESTO ROMPER EL SECRET
  }
  res.json({ error, status });
};

module.exports = { payment };
