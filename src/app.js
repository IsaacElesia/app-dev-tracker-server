require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const errorHandler = require('./middleware/error-handler');

const app = express();

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

// Middlewares
app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

//Routes
app.use('/api/auth', require('./auth/auth-router'));
app.use('/api/users', require('./users/users-router'));
app.use('/api/projects', require('./projects/projects-router'));

//Error Handler Middleware
app.use(errorHandler);

module.exports = app;
