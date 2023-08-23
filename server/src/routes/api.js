const express = require('express');

// const launchesRouter = require('./launches/launches.router');

const api = express.Router();

api.get('/message',(req,res)=>{
    res.status(201);
    res.send("What are you looking for???")
})
// api.use('/planets', planetsRouter);
// api.use('/launches', launchesRouter);

module.exports = api;