const express = require('express');
const bp = require('body-parser')
const app = express();
const { Sequelize } = require('sequelize');
const AuthController = require('./controllers/AuthController');

const sequelize = new Sequelize('jds_backend_app', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

const userRoute = require('./routes/users');
const indexRoute = require('./routes/index');
const productRoute = require('./routes/products');
app.use('/api/user', userRoute);
app.use('/api/', indexRoute);
app.use('/api/', productRoute);

app.listen(3000);

module.exports = app;