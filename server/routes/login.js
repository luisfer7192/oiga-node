const express = require('express');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const app = express();


// Get the user token
app.post('/login', (req, res) => {
    let body = req.body;

    User.findOne({ email: body.email }, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        // you can use only one if for the validate user and password, but i use different to do different process if (!userDB || !bcrypt.compareSync(body.password, userDB.password)) {
        // if you want a validation of the user
        if (!userDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Incorrect user or password'
                }
            });
        }

        // if you want just a validation for password
        if (!bcrypt.compareSync(body.password, userDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Incorrect user or password'
                }
            });
        }

        // create the sign
        let token = jwt.sign({
            user: userDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        // return the user data and the token
        res.json({
            ok: true,
            user: userDB,
            token
        });
    });
});

module.exports = app;
