const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// const passport = require('passport'); // Import passport at the beginning // Import your passport strategies

const api = require('./routes/api');

const app = express();

app.use(express.json({limit: '1000mb'}));
app.use(express.static(path.join(__dirname,'public')));

app.use(cors({
  origin: process.env.WEB_ORIGIN,
}));

// app.use(helmet());

app.use(morgan('combined'));

app.get('/', (req, res) => {
  const statusCode = 201;
  res.status(statusCode);
  res.send("Your server is responding shahid");
});

app.use('/v1', api);
//swagger setup
const options = {
  definition: {
    // openapi: "3.1.0",
    swagger: "2.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);
//end swagger setup

// app.use((err,req,res,next)=>{
//   res.json({
//     msg: "Sorry something is wrong with our server"
//   })
//   next();
// })

module.exports = app;
