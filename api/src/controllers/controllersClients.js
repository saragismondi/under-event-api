const axios = require("axios");
const { Event } = require("../db");
const User = require("../models/User");
const { Sequelize } = require("sequelize");

const getAllEvent = async (req, res) => {
  const api = await axios.get(
    "https://api.seatgeek.com/2/events?client_id=MjY2MjczMDh8MTY1MDM2NjAwNS4zNjUxNTQ3"
  );
  const result = api.data.events.map((e) => {
    return {
     
      title: e.venue.name,
      imagen: e.performers[0].image,
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
  const {  title, description, imagen, performers, date, time, stock } = req.body;
    
  if ( !title || !description || !imagen || !performers || !date || !time || !stock) {
    return res.status(404).json({ msg: "Info are required" })}
  else{
    try {
      const newEvent = await Event.create({
     
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


const getByTitle = async (req, res) => {
  let { title } = req.query;
  console.log(title)

  try {
    let eventName = await Event.findAll({
      where: {
        title: { [Sequelize.Op.iLike]: `%${title}%` },
      },
/*       include: {
        model: User,
        attributes: ["name", "lastName", "email", "password", "roll"],
        through: { attributes: [] },
      }, */
    });
    if (!eventName[0]) {
      return res.json({ msj: "ERROR, evento no encontrado" });
    }
    res.json(
      eventName,
    );
  } catch (error) {
    console.log(error);
  }
};
const getIdDb = async (req, res) => {
  const { id } = req.params;
  try {
    const db = await Event.findByPk(id, 
      
      
    //   {
    //   include: {
    //     model: User,
    //     attributes: ["name", "lastname", "email", "password", "rol"],
    //     trough: { attributes: [] },
    //   },
    // }
    
    
    
    );
    res.json(db );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllEvent,
  postEvent,
  getByTitle,
  getIdDb,
};
