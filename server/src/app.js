const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('../swaggerConfig');

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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));


module.exports = app;
