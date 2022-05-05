const axios = require("axios");
const { Event } = require("../db");
const User = require("../models/User");
const { Sequelize } = require("sequelize");
const data = require("../data/data.json");


//ESTA FUNCION SE UTILIZA UNICAMENTE CUANDO SE INICIA EL SERVIDOR
const getAllEvent = async () => {
  try {
    const result = data.map((e) => {
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

    const cargadb = await Event.bulkCreate(result);
    // console.log(cargadb);
    return cargadb;
  } catch (error) {
    console.log(error);
  }
};

//ESTA FUNCION NOS TRAE TODOS LOS EVENTOS DE LA DB, CUANDO QUERRAMOS PEGARLE A NUESTRO BACK
const getEventsDb = async (req, res) => {
  try {
    const db = await Event.findAll();

    if (db.length > 0) return res.send(db);

    return res.json({ msg: "No hay eventos en nuestra base de datos" });
  } catch (error) {
    console.log(error);
  }
};

//FUNCION QUE ME TRAE TODAS LAS CIUDADES SIN REPETIRSE
const solocitys = async (req, res) => {
  try {
    const db = await Event.findAll();
    var allCitys = db.map(e => e.dataValues.city);
    var setCitys = [...new Set(allCitys)];
    // console.log(setCitys);
    return res.send(setCitys);
  } catch (error) {
    console.log(error);
  }
};

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

  if (!title || !description || !imagen || !date || !time || !stock ||!cost || !month) {
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
  let { genero} = req.query;
  let { city } = req.query;
  let {cost}= req.query;
  let {month} = req.query;

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
    
  } else if  (city) {
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
    
  } 
  else {

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
  getEventsDb,
  postEvent,
  getByTitle,
  getIdDb,
  getByState,
  solocitys,
};
