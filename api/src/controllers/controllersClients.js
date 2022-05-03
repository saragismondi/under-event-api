const axios = require("axios");
const { Event } = require("../db");
const User = require("../models/User");
const { Sequelize } = require("sequelize");
const json = require("../data/data.json");

const getAllEvent = async (req, res) => {
  try {
    const result = json.map((e) => {
      return {
        title: e.title,
        imagen: e.imagen,
        city: e.city,
        place: e.place,
        description: e.description,
        genero: e.genero,
        date: e.date,
        time: e.time,
        stock: e.stock,
      };
    });

    const db = await Event.findAll();
    if (db.length > 0) {
      return res.json(db);
    } else {
      const cargadb = await Event.bulkCreate(result);
      res.json({ msg: "Eventos Cargados", cargadb });
    }
  } catch (error) {
    console.log(error);
  }
};

const postEvent = async (req, res) => {
  const {
    title,
    description,
    imagen,
    date,
    time,
    stock,
    eventType,
    place,
    User,
  } = req.body;

  if (!title || !description || !imagen || !date || !time || !stock) {
    return res.status(404).json({ msg: "Info are required" });
  } else {
    try {
      const newEvent = await Event.create({
        title,
        description,
        imagen,
        date,
        time,
        stock,
        eventType,
        place,
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
  let { state } = req.query;
  let { eventType } = req.query;
  let { date } = req.query;

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
  else if (state) {
    try {
      let eventState = await Event.findAll({
        where: {
          state: { [Sequelize.Op.iLike]: `%${state}%` },
        },
        // include: {
        //   model: User,
        //   attributes: ["name", "lastName", "email", "password", "roll"],
        //   through: { attributes: [] },
        // },
      });
      return res.json(eventState);
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
    return res.status(404).json({ msg: "error not found" });
  }
};

const getByState = async (req, res) => {
  let { state } = req.query;

  if (state) {
    try {
      let newState = await Event.findAll(state);

      res.send(newState);
    } catch (error) {
      console.log(error);
    }
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
  getByState,
};
