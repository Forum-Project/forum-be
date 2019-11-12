// Import dependencies for server file
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
require('dotenv').config();

// Declare server
server = express();

// Connect to collection
mongoose.connect(process.env.URL, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });

// Import middleware

// Import Routes

// Invoke dependencies 
server.use(express.json());
server.use(helmet());
server.use(cors({
  origin: '*',
  // allows headers to be read
  credentials: true
}));


// Connect Routes


module.exports = server;