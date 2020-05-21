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
app.use('/api/auth', require('./routes/auth-router'));
app.use('/api/users', require('./routes/users-router'));
app.use('/api/projects', require('./routes/projects-router'));
app.use('/api/project/team', require('./routes/project-team-router'));
app.use('/api/sections', require('./routes/sections-router'));
app.use('/api/section/team', require('./routes/section-team-router'));
app.use('/api/tasks', require('./routes/task-router'));

//Error Handler Middleware
app.use(errorHandler);

module.exports = app;
