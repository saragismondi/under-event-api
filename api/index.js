const server = require("./src/app.js");
const { getAllEvent } = require("./src/controllers/controllersClients.js");
const { conn } = require("./src/db.js");

const PORT = process.env.PORT || 3001;

// Syncing all the models at once.

conn.sync({ force: true }).then(() => {
  server.listen(PORT, async () => {
    await getAllEvent();

    console.log(`server listening at ${PORT}`); // eslint-disable-line no-console
  });
});
