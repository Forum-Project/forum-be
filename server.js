// Import dependencies for server file
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

// Declare server
const server = express();

// Connect to collection
mongoose.connect(process.env.URL, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });

// Import middleware


// Import Routes
const usersRoute = require('./routes/users-route');
const postsRoute = require('./routes/posts-route');
const categoriesRoute = require('./routes/categories-route');
const commentsModel = require('./routes/comments-routes')

// Invoke dependencies 
server.use(express.json());
server.use(helmet());
server.use(cors({
  origin: '*',
  // allows headers to be read
  credentials: true
}));


// Connect Routes
server.use('/users', usersRoute);
server.use('/posts', postsRoute);
server.use('/categories', categoriesRoute);
server.use('/comments', commentsModel);


module.exports = server;