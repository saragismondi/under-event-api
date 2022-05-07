// const { Op } = require("sequelize");
// const { User, Event, Order, OrderDetail, Ticket } = require("../../db");
// const Ticket = require("../../models/Ticket");

// //ruta que requiere los mismos datos del producto cargado en la ruta selectProduct
// //para hacer la carga del mismo en el carrito en la db con el id del usuario
// //correspondiente
// //retorna el numero de productos que hay dentro del carrito, el precio y la cantidad

// const addCart = async (req, res) => {
//   try {
//     const { email, quantity } = req.body;
//     if (!email) {
//       return res.status(202).send("Necessary parameters not found");
//     } else {
//       const getUserId = await User.findOne({
//         where: {
//           email: email,
//         },
//         // attributes: ["externalId"],
//       });
//       const stateCart = await Order.findOne({
//         where: {
//           [Op.and]: [
//             { userId: getUserId?.dataValues.id },
//             {
//               status: {
//                 [Op.or]: ["empty", "buying"],
//               },
//             },
//           ],
//         },
//       });

//       if (stateCart?.dataValues.status === "empty") {
//         stateCart.dataValues.status = "buying";
//       }
//       await Order.update(
//         {
//           status: "buying",
//         },
//         {
//           where: {
//             userId: stateCart?.dataValues.userId,
//             status: "empty",
//           },
//         }
//       );

//       const evento = await Event.findOne({
//         where: {
//           title: title,
//           place: place,
//           time: time,
//           date: date,
//           cost: cost,
//         },
//       });
//       const entradas = await Ticket.findOne({
//         where: { title: { [Op.iLike]: evento?.title.id } },
//       });
//       const productInCart = await OrderDetail.create({
//         price: price,
//         quantity: quantity,
//         productId: product?.dataValues.id,
//         OrderId: stateCart?.dataValues.id,
//         totalPrice: price * quantity,
//       });

//       const cartAmount = await Order_detail.findAll({
//         where: {
//           orderId: stateCart?.dataValues.id,
//         },
//         include: [{ model: Product }],
//       });

//       res.status(200).send(cartAmount);
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = {
//   addCart,
// };
