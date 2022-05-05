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
        cost: e.cost,
        month: e.month,
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

const solocitys = async (req, res) => {
  try {
    const db = await Event.findAll({
      attributes : ["city"]
    })
    return res.send(db)
  }
  catch (error) {
    console.log(error)
  }

}

const postEvent = async (req, res) => {
  const {
    title,
    imagen,
    city,
    place,
    description,
    genero,
    date,
    time,
    stock,
    cost,
    month,
    User,
  } = req.body;

  if (
    !title ||
    !description ||
    !imagen ||
    !date ||
    !time ||
    !stock ||
    !cost ||
    !month
  ) {
    return res.status(404).json({ msg: "Info are required" });
  } else {
    try {
      const newEvent = await Event.create({
        title,
        imagen,
        city,
        place,
        description,
        genero,
        date,
        time,
        stock,
        cost,
        month,
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
  let { genero } = req.query;
  let { city } = req.query;
  let { cost } = req.query;
  let { month } = req.query;

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
  else if (genero) {
    try {
      let genres = await Event.findAll({
        where: {
          genero: { [Sequelize.Op.iLike]: `%${genero}%` },
        },
        // include: {
        //   model: User,
        //   attributes: ["name", "lastName", "email", "password", "roll"],
        //   through: { attributes: [] },
        // },
      });
      return res.json(genres);
    } catch (error) {
      console.log(error);
    }
  } else if (cost) {
    try {
      let precio = await Event.findAll({
        where: {
          cost: { [Sequelize.Op.iLike]: `%${cost}%` },
        },
        // include: {
        //   model: User,
        //   attributes: ["name", "lastName", "email", "password", "roll"],
        //   through: { attributes: [] },
        // },
      });
      return res.json(precio);
    } catch (error) {
      console.log(error);
    }
  } else if (month) {
    try {
      let mes = await Event.findAll({
        where: {
          month: { [Sequelize.Op.iLike]: `%${month}%` },
        },
        // include: {
        //   model: User,
        //   attributes: ["name", "lastName", "email", "password", "roll"],
        //   through: { attributes: [] },
        // },
      });
      return res.json(mes);
    } catch (error) {
      console.log(error);
    }
  } else if (city) {
    try {
      let ciudad = await Event.findAll({
        where: {
          city: { [Sequelize.Op.iLike]: `%${city}%` },
        },
        // include: {
        //   model: User,
        //   attributes: ["name", "lastName", "email", "password", "roll"],
        //   through: { attributes: [] },
        // },
      });
      return res.json(ciudad);
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

const putEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      imagen,
      city,
      place,
      description,
      genero,
      date,
      time,
      stock,
      cost,
      month,
    } = req.body;
    const db = await Event.findByPk(id);

    if (title !== undefined) {
      db.title = title;
    } else if (imagen !== undefined) {
      db.imagen = imagen;
    } else if (city !== undefined) {
      db.city = city;
    } else if (place !== undefined) {
      db.place = place;
    } else if (description !== undefined) {
      db.description = description;
    } else if (genero !== undefined) {
      db.genero = genero;
    } else if (date !== undefined) {
      db.date = date;
    } else if (time !== undefined) {
      db.time = time;
    } else if (stock !== undefined) {
      db.stock = stock;
    } else if (cost !== undefined) {
      db.cost = cost;
    } else if (month !== undefined) {
      db.month = month;
    } 
      res.send.status(404).json({ msg: "no hubo actualizacion" });
    await db.save();
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

  putEvent,

  solocitys

};
