const path = require("path");
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const api = require('./routes/api');

const app = express();

app.use(cors({
  origin: process.env.WEB_ORIGIN,
}));

app.use(morgan('combined'));

app.use(express.json());

app.get('/',(req,res)=>{
  res.status(201);
  res.send("Your server is responding shahid");
})

app.use('/v1', api);

module.exports = app;