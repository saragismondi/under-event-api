
require('dotenv').config();
const Stripe = require('stripe')(process.env.SECRET_KEY);



const payment =  async (req, res) => {
  let status, error;
  const { token, amount } = req.body; // aca tengo que poner el orderId
  try {
    await Stripe.charges.create({
      source: token.id,
      amount,
      currency: 'usd',
    });
     //encontrar OrderId y actualizar el estado del todos los tickets y de la orden 
     // en front . encontrar el orden iD Y PASARSELO 
    status = 'success';
  } catch (error) {
    console.log(error);
    status = 'Failure';
  }
  res.json({ error, status });
};


module.exports = {payment}







