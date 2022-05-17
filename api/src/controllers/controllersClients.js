const axios = require("axios");
const { Event, Ticket, User } = require("../db");
const { Sequelize, Op } = require("sequelize");
const data = require("../data/data.json");

//ESTA FUNCION SE UTILIZA UNICAMENTE CUANDO SE INICIA EL SERVIDOR
const getAllEvent = async () => {
  try {
    const db = await Event.findAll();
    if (db.length > 0) return;
    for (i = 0; i < data.length; i++) {
      const newData = data[i];

      const eventDB = await Event.create(newData);
      let ticketArray = [];

      for (j = 0; j < eventDB.stock; j++) {
        ticketArray.push({
          status: "Disponible",
        });
      }
      const tickets = await Ticket.bulkCreate(ticketArray);
      await eventDB.addTicket(tickets);
    }
  } catch (error) {
    console.log(error);
  }
};

//ESTA FUNCION NOS TRAE TODOS LOS EVENTOS DE LA DB, CUANDO QUERRAMOS PEGARLE A NUESTRO BACK
const getEventsDb = async (req, res) => {
  try {
    const db = await Event.findAll();
    //console.log(db, "hola soy db ")
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
    var allCitys = db.map((e) => e.dataValues.city);
    var setCitys = [...new Set(allCitys)];
    // console.log(setCitys);
    return res.send(setCitys);
  } catch (error) {
    console.log(error);
  }
};

//FUNCION QUE ME TRAE TODAS LOS GENEROS SIN REPETIRSE
const soloGeneros = async (req, res) => {
  try {
    const db = await Event.findAll();
    var allGeneros = db.map((e) => e.dataValues.genero);
    var setGeneros = [...new Set(allGeneros)];
    // console.log(setCitys);
    return res.send(setGeneros);
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
    costTwo,
    month,
    address,
    location,
    externalId,
  } = req.body;

  console.log(req.body);

  if (
    !title ||
    !imagen ||
    !city ||
    !place ||
    !description ||
    !genero ||
    !date ||
    !time ||
    !stock ||
    !cost ||
    !month ||
    !address ||
    !location ||
    !externalId
  ) {
    console.log("error");
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
        costTwo,
        month,
        address,
        location,
      });
      //console.log(newEvent, "SOY EL EVENTOP");
      const user = await User.findOne({
        where: { externalId: externalId },
      });
      // await newEvent.addUser(user);
      await newEvent.update({
        UserId: user.id,
      });

      let ticketArray = [];
      for (var i = 0; i < stock; i++) {
        ticketArray.push({
          status: "Disponible",
        });
      }
      const tickets = await Ticket.bulkCreate(ticketArray);
      await newEvent.addTicket(tickets);

      res.json({ msg: " Evento Creado", newEvent });
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
    const db = await Event.findByPk(id);
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
      address,
      location,
    } = req.body;
    const db = await Event.findByPk(id);
    //console.log(req.body.title)

    if (title) db.title = title;
    if (imagen) db.imagen = imagen;
    if (city) db.city = city;
    if (place) db.place = place;
    if (description) db.description = description;
    if (genero) db.genero = genero;
    if (date) db.date = date;
    if (time) db.time = time;
    if (stock) db.stock = stock;
    if (cost) db.cost = cost;
    if (month) db.month = month;
    if (address) db.address = address;
    if (location) db.location = location;

    await db.save();
    res.json(db);
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "no hubo actualizacion" });
  }
};
const datesEvent = async (req, res) => {
  try {
    const eventosDate = await Event.findAll();
    const datesFiltrado = eventosDate.map((e) => e.date);

    //console.log(eventosDate, "hol soy EVENTOS DATE")
    res.json(datesFiltrado);
  } catch (error) {
    console.log(error);
  }
};
const getEventsByDate = async (req, res) => {
  const { date } = req.params;
  console.log(req.params.date);
  try {
    const eventosPorFecha = await Event.findAll();
    const eventosFiltrados = eventosPorFecha.filter((e) => e.date === date);
    res.json(eventosFiltrados);
  } catch (error) {
    console.log(error);
  }
};

//ruta que retorna la cantidad de tikets disponibles por evento
const getTiketsDisponibles = async (req, res) => {
  const { id } = req.params;
  try {
    const evento = await Event.findByPk(id, { include: [{ model: Ticket }] });
    const tickets = evento.Tickets;
    const ticketsDisponibles = tickets.filter((t) => t.status === "Disponible");
    res.json(ticketsDisponibles.length);
  } catch (error) {
    console.log(error);
  }
};

//ruta delete
const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const evento = await Event.findByPk(id);
    await evento.destroy();
    res.json({ msg: "evento eliminado" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "no se pudo eliminar" });
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
  soloGeneros,
  putEvent,
  datesEvent,
  getEventsByDate,
  getTiketsDisponibles,
};
