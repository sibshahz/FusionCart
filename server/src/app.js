const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport'); // Import passport at the beginning // Import your passport strategies

const api = require('./routes/api');

const app = express();

app.use(express.json());

app.use(cors({
  origin: process.env.WEB_ORIGIN,
}));

app.use(helmet());

app.use(morgan('combined'));

// Apply passport middleware after express.json() and before your routes
app.use(passport.initialize()); // Initialize Passport
// app.use(passport.session());    // If needed, this is for persistent login sessions

app.get('/', (req, res) => {
  const statusCode = 201;
  res.status(statusCode);
  res.send("Your server is responding shahid");
});

app.use('/v1', api);

module.exports = app;
