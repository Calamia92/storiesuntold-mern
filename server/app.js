require('dotenv').config();
const express = require('express');
const cors = require('cors');
const createError = require('http-errors');

// Import tes routeurs
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const sessionsRouter = require('./routes/sessions');
const contributionsRouter = require('./routes/contributions');

const app = express();

// Middleware
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
};
require('./swagger')(app);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API routes
app.use('/api', require('./routes/index'));
app.use('/api/users', require('./routes/users'));
app.use('/api/sessions', require('./routes/sessions'));
app.use('/api/contributions', require('./routes/contributions'));
app.use('/api/moderation', require('./routes/moderation'));

// 404 handler
app.use((req, res, next) => next(createError(404)));

// Error handler (JSON)
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: { message: err.message, ...(req.app.get('env') === 'development' && { stack: err.stack }) }
  });
});

module.exports = app;
