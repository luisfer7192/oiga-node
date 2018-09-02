const express = require('express');

const { checkToken, checkAdminRole } = require('../middlewares/authentication');

let app = express();
let Order = require('../models/order');
let Product = require('../models/product');


// ===========================
//  Get my Orders ROLE: USER_ROLE, ADMIN_ROLE
// ===========================
app.get('/my_orders', checkToken, (req, res) => {
    // set the start of the page
    let start = req.query.start || 0;
    start = Number(start);

    Order.find({ user: req.user._id })
        .skip(start)
        .limit(10)
        .populate('user', 'name email')
        .exec((err, orders) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                orders
            });
        });
});


// ===========================
//  Get Orders by status ROLE: ADMIN_ROLE
// ===========================
app.get('/orders', [checkToken, checkAdminRole], (req, res) => {
    // set the start of the page
    let start = req.query.start || 0;
    start = Number(start);

    // get the status of the orders or use the default value (in process)
    let status = req.query.status || 1;

    Order.find({ status })
        .skip(start)
        .limit(10)
        .populate('user', 'name email')
        .exec((err, orders) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                orders
            });
        });
});

// ===========================
//  Ger order by id ROLE: ADMIN_ROLE
// ===========================
app.get('/orders/:id', [checkToken, checkAdminRole], (req, res) => {
    let id = req.params.id;

    Order.findById(id)
        .populate('user', 'name email')
        .exec((err, orderDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!orderDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'ID no existe'
                    }
                });
            }

            res.json({
                ok: true,
                order: orderDB
            });

        });

});

// ===========================
//  Create a new order ROLE: USER_ROLE, ADMIN_ROLE
// ===========================
app.post('/orders', checkToken, async (req, res) => {
    let body = req.body;

    const { products } = body;
    // get the items
    let items = await Promise.all(products.map(async data => {
        const product = await Product.findById(data.id);
        return {
            name: product.name,
            price: product.price,
            qty: data.qty,
            product: data.id
        };
    }));

    // set the total
    const total = items.reduce((a, b) => (a.price * a.qty) + (b.price * b.qty));

    let order = new Order({
        user: req.user._id,
        description: body.description,
        status: body.status,
        total,
        items
    });

    order.save((err, orderDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            order: orderDB
        });
    });

});

// ===========================
//  Update the order ROLE: ADMIN_ROLE
// ===========================
app.put('/orders/:id', [checkToken, checkAdminRole], (req, res) => {
    let id = req.params.id;
    let body = req.body;

    Order.findById(id, async (err, orderDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!orderDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'ID not found'
                }
            });
        }

        const { products } = body;

        // get the items
        let items = await Promise.all(products.map(async data => {
            const product = await Product.findById(data.id);
            return {
                name: product.name,
                price: product.price,
                qty: data.qty,
                product: data.id
            };
        }));

        // set the total
        const total = items.reduce((a, b) => (a.price * a.qty) + (b.price * b.qty));

        orderDB.description = body.description;
        orderDB.status = body.status || 1;
        orderDB.total = total;
        orderDB.items = items;

        orderDB.save((err, orderSaved) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                order: orderSaved
            });
        });
    });
});

// ===========================
//  delete order ROLE: ADMIN_ROLE
// ===========================
app.delete('/orders/:id', [checkToken, checkAdminRole], (req, res) => {
    let id = req.params.id;

    Order.findByIdAndRemove(id, (err, orderDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!orderDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Id not found'
                }
            });
        }

        res.json({
            ok: true,
            message: 'Order deleted'
        });
    });
});

module.exports = app;
