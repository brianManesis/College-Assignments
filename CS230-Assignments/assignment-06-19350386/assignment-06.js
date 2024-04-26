/**
 * Tested with postman on ubuntu
 */

const express = require('express');
const mongoose = require('mongoose');
const dburl = require('./utils/connection').database;
const router = require('./routes/Router');

mongoose.connect(dburl)
  .catch((err) => console.log(err));

const server = express();

server.use(express.json());
server.use(router);

server.listen(5000);

