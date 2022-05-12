const { User, Reviews, Event, Order } = require("../db");

const addReview = async (req, res) => {
  const { description, rating, email } = req.body;
  const { id } = req.params;
  try {
    const getUserId = await User.findOne({
      where: {
        email: email,
      },
      //   attributes: ["id"],
    });

    console.log(getUserId, "Holaaaaaaaaa soy userid");
    const orders = await Order.findAll({
      where: {
        status: ["Approved"], //esto iría en completed pero esta en buying para testear
        UserId: getUserId?.dataValues.id,
      },
      include: [
        { model: User, attributes: ["name", "lastName", "email"] },
        { model: Event, attributes: ["title", "id"] },
      ],
    });
    console.log(orders, "SOY LA ORDEN!!!!");
    const eventos = await Event.findOne({
      where: {
        id: id,
      },
    });
    // console.log(excursion?.dataValues?.name, "EEEEEEEEEEEEEEEEEEEEEEEEE");

    let orderEvents = orders?.map((e) => e.events);
    let ticketComprado = orderEvents?.map((e) => e?.dataValues.title);

    // console.log(buyedExcursion, "probando buyedExcursion name???");
    const controlReview = await Reviews.findAll({
      where: {
        EventId: id,
      },
    });

    // console.log(controlReview.map((e)=>e.userId), "AAAAAAA")

    if (
      controlReview?.map((e) => e.UserId).includes(getUserId?.dataValues?.id)
    ) {
      return res.status(200).send("Ya diste tu opinión");
    }

    if (ticketComprado?.includes(eventos?.dataValues?.title)) {
      const reviewCreada = await Reviews.create({
        description: description,
        rating: rating,
        UserId: getUserId?.dataValues.id,
        EventId: id,
      });
      //   const response = await Reviews.findAll({
      //     //posibilidad de mandar como respuesta directamente el array de opiniones
      //     where: {
      //       EventId: id,
      //     },
      //     include: [{ model: User, attributes: ["name", "lastName"] }],
      //   });
      //   return res.status(201).send(response); //en caso de no usar "response" cambiar el mensaje en el .send y comentar las lineas 57-64
      return res.json({ msg: "Review creada con exito", reviewCreada });
    } else {
      return res
        .status(200)
        .send("Debes comprar la excursión para dar una opinión");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addReview };
