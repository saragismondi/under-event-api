const axios = require("axios");
const { Event } = require("../db");

const getAllEvent = async (req, res) => {
  const api = await axios.get(
    "https://api.seatgeek.com/2/events?client_id=MjY2MjczMDh8MTY1MDM2NjAwNS4zNjUxNTQ3"
  );
  const result = api.data.events.map((e) => {
    return {
      id: e.id,
      title: e.venue.name,
      imagen: e.performers.map((e) => {
        return e.image;
      }),
    };
  });

  const db = await Event.findAll();
  if (db.length > 0) {
    return res.json(db);
  } else {
    const cargadb = await Event.bulkCreate(result);
    res.json({ msg: "Eventos Cargados", cargadb });
  }
};
const postEvent = async (req, res) => {
  const { id, title, description, imagen, performers, date, time, stock } = req.body;
    
  if ( !id, !title || !description || !imagen || !performers || !date || !time || !stock) {
    return res.status(404).json({ msg: "Info are required" })}
  else{
    try {
      const newEvent = await Event.create({
        id,
        title,
        description,
        imagen,
        performers,
        date,
        time,
        stock,
      });
      //let id_user = await User.findAll({ where: { name: user } });
      //await newEvent.addUser(id_user);
      res.json({ msg: " Evento Creado" });
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = {
  getAllEvent,
  postEvent,
};
