const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const User = require('../models/user');
const { checkToken, checkAdminRole } = require('../middlewares/authentication');

const app = express();

// ===========================
//  Get users
// ===========================
app.get('/user', checkToken, (req, res) => {
    let start = req.query.start || 0;
    start = Number(start);

    let limit = req.query.limit || 5;
    limit = Number(limit);

    User.find({ estado: true }, 'name email role status google img')
        .skip(start)
        .limit(limit)
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            User.count({ status: true }, (err, count) => {
                res.json({
                    ok: true,
                    users,
                    count
                });
            });
        });
});

// ===========================
//  Create users (disabled token validations because it have to create the admin role manualy with postman or method you want)
// ===========================
app.post('/user', /*[checkToken, checkAdminRole],*/ function(req, res) {
    let body = req.body;

    if (_.isEmpty(body.password) || _.isEmpty(body.email) || _.isEmpty(body.name)) {
        return res.status(400).json({
            ok: false,
            err: {
              'message': 'the following fields are required: name, email, password'
            }
        });
    }

    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    user.save((err, userDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            user: userDB
        });
    });
});

// ===========================
//  Get user by id
// ===========================
app.put('/user/:id', [checkToken, checkAdminRole], function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'status']);

    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            user: userDB
        });
    })
});

// ===========================
//  Delete user
// ===========================
app.delete('/user/:id', [checkToken, checkAdminRole], function(req, res) {
    let id = req.params.id;

    let changeStatus = {
        status: false
    };

    User.findByIdAndUpdate(id, changeStatus, { new: true }, (err, userDeleted) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!userDeleted) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User not found'
                }
            });
        }

        res.json({
            ok: true,
            user: userDeleted
        });
    });
});



module.exports = app;
