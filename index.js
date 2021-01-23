//All modules imported from Node Package
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config.json');
const get_rout = require('./routs/get');
const post_rout = require('./routs/post');

//Assigning app to express
const app = express();

//Middle Ware
app.use(express.json());                       //to converting json data to computer known language
app.use('/get', get_rout);
app.use('/post', post_rout);

//Connecting to mongodb data-base
mongoose.connect(config.database_url, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log("Connected to data-base success");
});


//API is hosted in
app.listen(config.port, () => {
  console.log(`Spot Hunt API listening at http://localhost:${config.port}`);
})