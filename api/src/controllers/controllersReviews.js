const { User, Reviews, Event, Order } = require("../db");

// const addReview = async (req, res) => {
//   const { description, rating, email } = req.body;
//   const { id } = req.params;
//   try {
//     const encuentroEvento = await Event.findByPk(id);
//     const encuentroUsuario = await User.findOne({
//       where: { email },
//     });
//     //console.log(encuentroUsuario, "hola soy el usuario")
//     const encuentroOrden = await Order.findOne({
//       where: {
//         UserId: encuentroUsuario.id,
//         status: "Pending", // aca para probar tengo que poner "PENDING ", LUEGO PASAR AAPROBED
//       },
//     });
//     if (encuentroOrden) {
//       const review = await Reviews.create({
//         description,
//         rating,
//         UserId: encuentroUsuario.id,
//         EventId: encuentroEvento.id,
//       });
//       console.log(review, "hola soy la review")
//       return res.status(200).json(review);
//     } else {
//       return res.json({
//         message:
//           "No puede hacer una review a un evento al cual usted no ha asistido",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
const addReview = async (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;
  try {
    if (!name || !description ) {
      return res.status(404).json({ msg: "Complete los campos requeridos" });
    } else {
      const neww = await Reviews.create({
        name,
        description,
       
      });
      const encuentro = await Event.findByPk(id);
      await encuentro.addReviews(neww);
      const final = await Event.findByPk(id, {
        include: {
          model: Reviews,
        },
      });
      res.send(final);
    }
  } catch (error) {
    console.log(error);
  }
};

////////////////////////////////////////////////////////////////////
const getReviews = async (req, res) => {
  const { id } = req.params;

  try {
    const encuentroEvento = await Event.findByPk(id);
    //console.log(encuentroEvento, "HOLA SOY EL EVENTO")
    const encuentroReviews = await Reviews.findAll({
      where: {
        EventId: encuentroEvento.id,
      },
    });
    //console.log(encuentroReviews, "HOLA SOY LAS REVIEWS")

    return res.json(encuentroReviews);
  } catch (error) {
    console.log(error);
  }
};
////////////////////////////////////////////////////////////////////

const deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    const encuentroReview = await Reviews.findByPk(id);

    await encuentroReview.destroy();

    return res.json({
      message: "Review eliminada",
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { addReview, getReviews, deleteReview };
