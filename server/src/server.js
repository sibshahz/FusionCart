const http = require('http');

const {mongoConnect} = require("./services/mongo");

require('dotenv').config();

const app = require('./app');

const passport = require('passport');

app.use(passport.initialize());

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();