const express = require('express');

const { checkToken, checkAdminRole } = require('../middlewares/authentication');


let app = express();
let Product = require('../models/product');


// ===========================
//  get all products ROLE: USER_ROLE, ADMIN_ROLE
// ===========================
app.get('/products', checkToken, (req, res) => {
    let start = req.query.start || 0;
    start = Number(start);

    Product.find({ available: true })
        .skip(start)
        .limit(10)
        .populate('user', 'name email')
        .populate('category', 'description')
        .exec((err, products) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                products
            });
        })
});

// ===========================
//  Get product by id ROLE: USER_ROLE, ADMIN_ROLE
// ===========================
app.get('/products/:id', checkToken, (req, res) => {
    let id = req.params.id;

    Product.findById(id)
        .populate('user', 'name email')
        .populate('category', 'name')
        .exec((err, productDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!productDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'ID not found'
                    }
                });
            }

            res.json({
                ok: true,
                product: productDB
            });

        });

});

// ===========================
//  search products ROLE: USER_ROLE, ADMIN_ROLE
// ===========================
app.get('/products/buscar/:termino', checkToken, (req, res) => {
    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');

    Product.find({ name: regex })
        .populate('category', 'name')
        .exec((err, products) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                products
            })
        })
});



// ===========================
//  create product ROLE: ADMIN_ROLE
// ===========================
app.post('/products', [checkToken, checkAdminRole], (req, res) => {
    let body = req.body;

    let product = new Product({
        user: req.user._id,
        name: body.name,
        price: body.price,
        description: body.description,
        available: body.available,
        category: body.category
    });

    product.save((err, productDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            product: productDB
        });

    });

});

// ===========================
//  update product ROLE: ADMIN_ROLE
// ===========================
app.put('/products/:id', [checkToken, checkAdminRole], (req, res) => {
    let id = req.params.id;
    let body = req.body;

    Product.findById(id, (err, productDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            });
        }

        productDB.name = body.name;
        productDB.price = body.price;
        productDB.category = body.category;
        productDB.available = body.available;
        productDB.description = body.description;

        productDB.save((err, productGuardado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                product: productGuardado
            });
        });
    });
});

// ===========================
//  Delete product ROLE: ADMIN_ROLE
// ===========================
app.delete('/products/:id', [checkToken, checkAdminRole], (req, res) => {
    let id = req.params.id;

    Product.findById(id, (err, productDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'ID no existe'
                }
            });
        }

        // change the product to available false
        productDB.available = false;

        productDB.save((err, productBorrado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                product: productBorrado,
                mensaje: 'Product borrado'
            });
        })
    })
});

module.exports = app;
