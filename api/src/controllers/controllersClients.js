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
      eventType: e.type,
      date: e.announce_date.split("", 10).join(""),
      time: e.datetime_local.split('T').pop()
      
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
  const {
    title,
    description,
    imagen,
    performers,
    date,
    time,
    stock,
    eventType,
  } = req.body;

  if (!title || !description || !imagen || !date || !time || !stock) {
    return res.status(404).json({ msg: "Info are required" });
  } else {
    try {
      const newEvent = await Event.create({
        title,
        description,
        imagen,
        performers,
        date,
        time,
        stock,
        eventType,
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
  let { time } = req.query;
  let { eventType } = req.query;

  if (title)
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
      return res.json(eventName);
    } catch (error) {
      console.log(error);
    }
  else if (time) {
    try {
      let eventTime = await Event.findAll({
        where: {
          time: { [Sequelize.Op.iLike]: `%${time}%` },
        },
        // include: {
        //   model: User,
        //   attributes: ["name", "lastName", "email", "password", "roll"],
        //   through: { attributes: [] },
        // },
      });
      return res.json(eventTime);
    } catch (error) {
      console.log(error);
    }
  } else if (eventType) {
    try {
      let type = await Event.findAll({
        where: {
          eventType: { [Sequelize.Op.iLike]: `%${eventType}%` },
        },
        //include: {
        //   model: User,
        //   attributes: ["name", "lastName", "email", "password", "roll"],
        //   through: { attributes: [] },
        // },
      });
      return res.json(type);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(404).json({ msj: "ERROR, evento no encontrado" });
  }
};

const getIdDb = async (req, res) => {
  const { id } = req.params;
  try {
    const db = await Event.findByPk(
      id

      //   {
      //   include: {
      //     model: User,
      //     attributes: ["name", "lastname", "email", "password", "rol"],
      //     trough: { attributes: [] },
      //   },
      // }
    );
    res.json(db);
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
