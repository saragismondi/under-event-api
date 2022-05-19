const axios = require("axios");
const { Event, User, Order, Ticket } = require("../db");
const { Sequelize } = require("sequelize");

const postUser = async (req, res) => {
  const { name, email, lastName, externalId, picture } = req.body;
  try {
    const user = await User.create({
      name,
      lastName,
      email,
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
                  attributes: ["id", "title", "date", "city"],
                },
              ],
              attributes: ["id", "status"],
            },
          ],
          attributes: ["status", "date", "totalPrice"],
        },
      ],
      attributes: [
        "id",
        "name",
        "lastName",
        "email",
        "roll",
        "picture",
        "city",
        "state",
      ],
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

const banUser = async (req, res) => {
  const { externalId, block } = req.body;
  try {
    const token = await axios.post(
      "https://dev-5at2rm27.us.auth0.com/oauth/token",
      {
        client_id: "KtU0uUgJAYHQAKzpNzkyYE2dWeGzb5d6",
        client_secret:
          "IhVNevytSZCuFS86MQUSW8q3Fj9zHfuWz1rgWEP90X2dr9KtcnUT0R85oiOt6KmI",
        audience: "https://dev-5at2rm27.us.auth0.com/api/v2/",
        grant_type: "client_credentials",
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000/",
        },
      }
    );
    console.log(token.data);
    const json = await axios.patch(
      `https://dev-5at2rm27.us.auth0.com/api/v2/users/${externalId}`,
      {
        blocked: block,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.data.access_token}`,
        },
      }
    );
    console.log(json.data);
  } catch (error) {
    console.log(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      order: [["createdAt", "DESC"]],
    });
    return res.json(users);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { postUser, getUser, updateUser, getAllUsers, banUser };
