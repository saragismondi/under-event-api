const Stripe = require("stripe")(process.env.SECRET_KEY);
const { User, Order, Ticket, Event } = require("../db");
const { sendEmail } = require("./sendEmail/sendEmail");
const { createOrder, updateOrderStatus } = require("../services/servicesOrder");
const {
  findTicketsByOrderId,
  updateTicketsStatusByOrderId,
} = require("../services/servicesTickets");
//const  {ticketModel} = require("./ticket.js");

const mailSucces = {
  title: "Su compra ha sido exitosa",
  buttonLink: "https://under-event-client.vercel.app/", // aca debe ir el link de VERSEL ULTIMA VERSION
  buttonText: " Mira mas Eventos ",
  noteMessage: "No compartas estos Tickets son de uso exclusivo para ti",
};
const mailFail = {
  title: "Su compra ha sido rechazada",
  message: "Intenta de nuevo en nuestra web wwww.underevent.com",
  buttonLink: "https://under-event-client.vercel.app/",
  buttonText: "Mira mas Eventos ",
  noteMessage: "Puedes reintentar la compra con el carrito de compras",
};

const payment = async (req, res) => {
  let status, error;
  const { token, amount, orderData } = req.body; // aca tengo que poner el orderId
  //console.log(token, "hola soy el TOKEN");
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

    //  let tickets =  await ticketModel({content})
    mailSucces.message = encuentroTickets
      .map((e) => {
        //console.log(e.Event);
        return (
          `
          <!DOCTYPE html>
          <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
          
          <head>
            <title></title>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
            <style>
              * {
                box-sizing: border-box;
              }
          
              body {
                margin: 0;
                padding: 0;
              }
          
              a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: inherit !important;
              }
          
              #MessageViewBody a {
                color: inherit;
                text-decoration: none;
              }
          
              p {
                line-height: inherit
              }
          
              .desktop_hide,
              .desktop_hide table {
                mso-hide: all;
                display: none;
                max-height: 0px;
                overflow: hidden;
              }
          
              @media (max-width:720px) {
                .desktop_hide table.icons-inner {
                  display: inline-block !important;
                }
          
                .icons-inner {
                  text-align: center;
                }
          
                .icons-inner td {
                  margin: 0 auto;
                }
          
                .row-content {
                  width: 100% !important;
                }
          
                .column .border,
                .mobile_hide {
                  display: none;
                }
          
                table {
                  table-layout: fixed !important;
                }
          
                .stack .column {
                  width: 100%;
                  display: block;
                }
          
                .mobile_hide {
                  min-height: 0;
                  max-height: 0;
                  max-width: 0;
                  overflow: hidden;
                  font-size: 0px;
                }
          
                .desktop_hide,
                .desktop_hide table {
                  display: table !important;
                  max-height: none !important;
                }
              }
            </style>
          </head>
          
          <body style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
            <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;">
              <tbody>
                <tr>
                  <td>
                    <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                      <tbody>
                        <tr>
                          <td>
                            <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 700px;" width="700">
                              <tbody>
                                <tr>
                                  <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                    <table class="empty_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td>
                                          <div></div>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                      <tbody>
                        <tr>
                          <td>
                            <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 700px;" width="700">
                              <tbody>
                                <tr>
                                  <td class="column column-1" width="25%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-bottom: 2px solid #000000; border-left: 2px solid #000000; border-right: 2px solid #000000; border-top: 2px solid #000000;">
                                    <table class="image_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td style="width:100%;padding-right:0px;padding-left:0px;padding-top:5px;">
                                          <div align="center" style="line-height:10px"><img src=${e.Event.dataValues.imagen} style="display: block; height: auto; border: 0; width: 171px; max-width: 100%;" width="171" alt="I'm an image" title="I'm an image"></div>
                                        </td>
                                      </tr>
                                    </table>
                                    <table class="heading_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td style="padding-top:15px;text-align:center;width:100%;padding-bottom:5px;">
                                          <h1 style="margin: 0; color: #393d47; direction: ltr; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size: 18px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">UNDER EVENT </span></h1>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                  <td class="column column-2" width="50%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-bottom: 2px solid #000000; border-left: 2px solid #000000; border-right: 2px solid #000000; border-top: 2px solid #000000;">
                                    <table class="heading_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td style="padding-left:10px;text-align:center;width:100%;padding-top:5px;">
                                          <h2 style="margin: 0; color: #393d47; direction: ltr; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size: 18px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">${e.Event.dataValues.title}</span></h2>
                                        </td>
                                      </tr>
                                    </table>
                                    <table class="divider_block" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td>
                                          <div align="center">
                                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                              <tr>
                                                <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;"><span>&#8202;</span></td>
                                              </tr>
                                            </table>
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                    <table class="text_block" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                      <tr>
                                        <td>
                                          <div style="font-family: sans-serif">
                                            <div class="txtTinyMce-wrapper" style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2; font-family: Arial, Helvetica Neue, Helvetica, sans-serif;">
                                              <p style="margin: 0; font-size: 12px;">LUGAR:${ e.Event.dataValues.location}</p>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                    <table class="text_block" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                      <tr>
                                        <td>
                                          <div style="font-family: sans-serif">
                                            <div class="txtTinyMce-wrapper" style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2; font-family: Arial, Helvetica Neue, Helvetica, sans-serif;">
                                              <p style="margin: 0; font-size: 12px;">FECHA:${ e.Event.dataValues.date}&nbsp;</p>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                    <table class="text_block" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                      <tr>
                                        <td>
                                          <div style="font-family: sans-serif">
                                            <div class="txtTinyMce-wrapper" style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2; font-family: Arial, Helvetica Neue, Helvetica, sans-serif;">
                                              <p style="margin: 0; font-size: 12px;">HORARIO:${e.Event.dataValues.time} &nbsp;</p>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                    <table class="text_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                      <tr>
                                        <td style="padding-bottom:15px;padding-left:10px;padding-right:10px;padding-top:10px;">
                                          <div style="font-family: sans-serif">
                                            <div class="txtTinyMce-wrapper" style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #555555; line-height: 1.2; font-family: Arial, Helvetica Neue, Helvetica, sans-serif;">
                                              <p style="margin: 0; font-size: 12px;">TICKET: ${e.dataValues.id}&nbsp;</p>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                  <td class="column column-3" width="25%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-bottom: 2px solid #000000; border-left: 2px solid #000000; border-right: 2px solid #000000; border-top: 2px solid #000000;">
                                    <table class="image_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td style="width:100%;padding-right:0px;padding-left:0px;padding-top:5px;">
                                          <div align="center" style="line-height:10px"><img src="https://qrcode.tec-it.com/API/QRCode?data=smsto%3a555-555-5555%3aGenerador+de+C%c3%b3digos+QR+de+TEC-IT" style="display: block; height: auto; border: 0; width: 171px; max-width: 100%;" width="171" alt="I'm an image" title="I'm an image"></div>
                                        </td>
                                      </tr>
                                    </table>
                                    <table class="social_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td style="padding-bottom:15px;padding-left:10px;padding-right:10px;padding-top:10px;text-align:center;">
                                          <table class="social-table" width="144px" border="0" cellpadding="0" cellspacing="0" role="presentation" align="center" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                            <tr>
                                              <td style="padding:0 2px 0 2px;"><a href="https://www.facebook.com/" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-color/facebook@2x.png" width="32" height="32" alt="Facebook" title="facebook" style="display: block; height: auto; border: 0;"></a></td>
                                              <td style="padding:0 2px 0 2px;"><a href="https://www.twitter.com/" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-color/twitter@2x.png" width="32" height="32" alt="Twitter" title="twitter" style="display: block; height: auto; border: 0;"></a></td>
                                              <td style="padding:0 2px 0 2px;"><a href="https://www.linkedin.com/" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-color/linkedin@2x.png" width="32" height="32" alt="Linkedin" title="linkedin" style="display: block; height: auto; border: 0;"></a></td>
                                              <td style="padding:0 2px 0 2px;"><a href="https://www.instagram.com/" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-color/instagram@2x.png" width="32" height="32" alt="Instagram" title="instagram" style="display: block; height: auto; border: 0;"></a></td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                      <tbody>
                        <tr>
                          <td>
                            <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 700px;" width="700">
                              <tbody>
                                <tr>
                                  <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                    <table class="icons_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td style="vertical-align: middle; color: #9d9d9d; font-family: inherit; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
                                          <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                            <tr>
                                              <td style="vertical-align: middle; text-align: center;">
                                                <!--[if vml]><table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
                                                <!--[if !vml]><!-->
                                      
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table><!-- End -->
          </body>
          
          </html>
`
        )
      })
      
    //console.log(mailSucces.message, "hola soy el message");

    const encuentroUsuario = await User.findByPk(order.UserId);

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
