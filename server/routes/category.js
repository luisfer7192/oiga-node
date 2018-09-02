const express = require('express');

let { checkToken, checkAdminRole } = require('../middlewares/authentication');

let app = express();

let Category = require('../models/category');

// ============================
// Show all categories ROLE: USER_ROLE, ADMIN_ROLE
// ============================
app.get('/category', checkToken, (req, res) => {
    Category.find({})
        .sort('description')
        .populate('user', 'name email')
        .exec((err, categories) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                categories
            });
        });
});

// ============================
// Show category by id ROLE: USER_ROLE, ADMIN_ROLE
// ============================
app.get('/category/:id', checkToken, (req, res) => {
    let id = req.params.id;

    Category.findById(id, (err, categoryDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoryDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'ID not found'
                }
            });
        }
        res.json({
            ok: true,
            category: categoryDB
        });
    });
});

// ============================
// Create category ROLE: ADMIN_ROLE
// ============================
app.post('/category', [checkToken, checkAdminRole], (req, res) => {
    let body = req.body;

    let category = new Category({
        description: body.description,
        user: req.user._id // get the user id from the token
    });

    category.save((err, categoryDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoryDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            category: categoryDB
        });
    });
});

// ============================
// Update the category ROLE: ADMIN_ROLE
// ============================
app.put('/category/:id', [checkToken, checkAdminRole], (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let descCategory = {
        description: body.description
    };

    Category.findByIdAndUpdate(id, descCategory, { new: true, runValidators: true }, (err, categoryDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoryDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            category: categoryDB
        });
    });
});

// ============================
// Delete category ROLE: ADMIN_ROLE
// ============================
app.delete('/category/:id', [checkToken, checkAdminRole], (req, res) => {
    let id = req.params.id;

    Category.findByIdAndRemove(id, (err, categoryDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoryDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'ID not found'
                }
            });
        }

        res.json({
            ok: true,
            message: 'Category deleted'
        });
    });
});


module.exports = app;
