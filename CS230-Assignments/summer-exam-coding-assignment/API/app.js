/**
 * Tested with postman on ubuntu
 */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dburl = require('./utils/connection').database;
const router = require('./Routes/Router');

mongoose.connect(dburl)
  .catch((err) => console.log(err));

const server = express();
server.use(cors());
server.use(express.json());
server.use(router);

server.listen(5000);

/**
 * The Database design can be seen in the model schemas.
 * It involves 3 collections, One for Tutors, Students and Tutorials
 * The Tutors and Students collections use embedded design for Address.
 */