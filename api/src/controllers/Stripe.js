const Stripe = require("stripe")(process.env.SECRET_KEY);
const { User, Order, Ticket, Event } = require("../db");
const { sendEmail } = require("./sendEmail/sendEmail");

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
  const { token, amount, orderId } = req.body; // aca tengo que poner el orderId
  console.log(token, "hola soy el TOKEN")
  try {
    await Stripe.charges.create({
      source: token.id,
      amount: amount * 100,
      currency: "usd",
    });
    //encuentro orden POR ID
    const order = await Order.findByPk(orderId);

    //  aca actualizo el estado dela orden
    order.status = "Approved";
    await order.save();

    //ENCUENTRA TICKETS Y ACTUALIZA SU status
    const encuentroTickets = await Ticket.findAll({
      where: {
        OrderId: orderId,
      },
      include: [{ model: Event }],
    });
    // console.log(encuentroTickets, "soy los tickets")

    await encuentroTickets.forEach(async (ticket) => {
      ticket.status = "Vendido";
      await ticket.save();
    });
    mailSucces.message = encuentroTickets
      .map((e) => {
        //console.log(e);
        return [ // emailFormato({varibles que quiero enviar}), fecha, hora, lugar, nombre del evento
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
      .join("\n"); // esto es un enter
    //console.log(mailSucces, "soy el mail de exito");

    const encuentroUsuario = await User.findByPk(order.UserId);
    const emailDeUsuario = encuentroUsuario.dataValues.email;

    sendEmail(emailDeUsuario, mailSucces);
    status = "success";
    console.log(emailDeUsuario);
  } catch (error) {
    const order = await Order.findByPk(orderId);

    //  aca actualizo el estado dela orden
    order.status = "Rejected";
    await order.save();

    //ENCUENTRA TICKETS Y ACTUALIZA SU status
    const encuentroTickets = await Ticket.findAll({
      where: {
        OrderId: orderId,
      },
    });
    await encuentroTickets.forEach(async (ticket) => {
      ticket.status = "Disponible";
      await ticket.save();
    });

    console.log(error);

    const encuentroUsuario = await User.findByPk(order.UserId);
    const emailDeUsuario = encuentroUsuario.dataValues.email;
    sendEmail(emailDeUsuario, mailFail);
    status = "Failure"; // PARA PROBAR ESTO ROMPER EL SECRET
  }
  res.json({ error, status });
};

// ESTA RUT SIEMPRE RESPONDE 200 PERO NECESITAMOS VERIFICAR QUE DIGA SUCCES QUE ESTA DENTRO DE DATA
// CONSOLOGUEAR DESDE EL FRONT EL RESULT

module.exports = { payment };