const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const path = require('path');
const config = require('./config/database');

//set server port
const port = 3000;

//connect to mongo
mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
  console.log(`Successfully connected to database ${config.database}`);
});

mongoose.connection.on('error', (err) => {
  console.log(`Database connection error: ${err}`);
});

//create express app
const app = express();

//add middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

//static folder
app.use(express.static(path.join(__dirname, 'public')));

//set index route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

//start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
