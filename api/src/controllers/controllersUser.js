const axios = require("axios");
const { Event, User, Order, Ticket } = require("../db");
const { Sequelize } = require("sequelize");

const postUser = async (req, res) => {
  const { name, email, roll, lastName, externalId, picture } = req.body;
  try {
    const user = await User.create({
      name,
      lastName,
      email,
      roll,
      externalId,
      picture,
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (req, res) => {
  const { externalId } = req.params;
  try {

//buscar un usuario por externalId e incluir Order y Eventos
    const user = await User.findOne({
      where: {
        externalId: externalId,
      },
      include: [
        {
          model: Order,
          include: [
            {
              model: Ticket,
              include: [
                {
                  model: Event,
                  attributes: ["id","title","date","city"],
                },
              ],
              attributes: ["id","status"],
            },
          ],
          attributes: ["status", "date", "totalPrice"],
        },
      ],
      attributes: ["name", "lastName", "email", "roll", "picture", "city", "state"],
    });
    return res.json(user);






    // const user = await User.findOne(
    //   {
    //     where: {
    //       externalId,
    //     },
    //   },
    //   { include: [{ model: Order }, { model: Event }] }
    // );
    // return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  const { externalId } = req.params;
  const { name, email, roll, lastName, picture, city, state } = req.body;
  try {
    const userUpdated = await User.update(
      {
        name,
        email,
        roll,
        lastName,
        picture,
        city,
        state,
      },
      {
        where: {
          externalId,
        },
      }
    );
    const user = await User.findOne({
      where: {
        externalId,
      },
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { postUser, getUser, updateUser };
