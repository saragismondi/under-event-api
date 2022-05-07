const axios = require("axios");
const { Event, User } = require("../db");
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
