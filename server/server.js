require('./config/config');

const express = require('express');
const mongoose = require('mongoose');


const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Global route configuration
app.use(require('./routes/index'));

// connect to the Database
mongoose.connect(process.env.URLDB, (err) => {
    if (err) throw err;

    console.log('DATABASE ONLINE'); // eslint-disable-line no-console
});


app.listen(process.env.PORT, () => {
    console.log('Listening port: ', process.env.PORT); // eslint-disable-line no-console
});
