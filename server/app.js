require('dotenv').config();
const express = require("express");
const path = require('path');
const app = express();
const todoRouter = require('./routes/todos.js')

app.use(express.json());
app.use('/', express.static(path.join(__dirname, '../client/build')));
app.use('/todos', todoRouter);

module.exports = app;