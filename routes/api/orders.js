const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load models
const User = require('../../models/User');
const Order = require('../../models/Order');
const Product = require('../../models/Product');

// Load input validation
const validateOrderInput = require('../../validation/order');

// @route POST api/orders/create
// @desc create order route
// @access Private
router.post('/create', passport.authenticate('jwt', {session: false}), (req, res) => {
    // get cookie (orderRows)
    // get product name instead of coockie id
    // get product price
    // calculate total price
    // Get adress etc from user input (req.body...)
    // save Order

    //TODO: get real cookie or localstorage and check if valid!
    const myCookie = [
        {
            id: 1,
            productName: "Pralin 1",
            price: 22,
            quantity: 5
        },
        {
            id: 2,
            productName: "Pralin 2",
            price: 25,
            quantity: 2
        }
    ];

    const { errors, isValid } = validateOrderInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    let sum = 0;
    for (let i = 0; i < myCookie.length; i++) {
        sum += myCookie[i].price * myCookie[i].quantity;        
    }

    const userOrder = new Order({
        userId: req.user.id,
        orderedProducts: myCookie,
        customerName: req.body.customerName,
        street: req.body.street,
        zip: req.body.zip,
        city: req.body.city,
        email: req.body.email,
        totalSum: sum
    });
    userOrder.save()
        .then(order => res.json(order))
        .catch(err => res.json(err));


});

// @route GET api/orders/all/active
// @desc get all active order route
// @access Private
router.get('/all/active', passport.authenticate('jwt', {session: false}), (req, res) => {
    if(req.user.role) {
        Order.find({ 'active': true})
            .then(orders => {
                if(orders.length > 0) {
                    return res.status(200).json(orders);
                } else {
                    return res.status(204).json({error: 'Could not find any products'});
                }
            })
            .catch(err => res.status(400).json(err));
    } else {
        return res.status(404).json({msg: 'You have to be admin to do this'});
    }
});

// @route GET api/orders/all/inactive
// @desc get all inactive order route
// @access Private
router.get('/all/inactive', passport.authenticate('jwt', {session: false}), (req, res) => {
    if(req.user.role) {
        Order.find({ 'active': false})
            .then(orders => {
                if(orders.length > 0) {
                    return res.status(200).json(orders);
                } else {
                    return res.status(204).json({error: 'Could not find any products'});
                }
            })
            .catch(err => res.status(400).json(err));
    } else {
        return res.status(404).json({msg: 'You have to be admin to do this'});
    }
});
//TODO: Should this only be available for admin?
// @route GET api/orders/order/:id
// @desc get one order route
// @access Private
router.get('/order/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    if(req.user.role) {
        Order.findById(req.params.id)
            .then(order => {
                if(order.userId == req.user.id || req.user.role) {
                    return res.status(200).json(order);
                } else {
                    return res.status(401).json({msg: 'You are not authorized to do that'});
                }
            })
            .catch(err => res.status(400).json(err));
    } else {
        return res.status(401).json('Not authorized');
    }
});

// @route GET api/orders/user/active/
// @desc get all active orders for user by userId route
// @access Private
router.get('/active', passport.authenticate('jwt', {session: false}), (req, res) => {
    Order.find({'userId': req.user.id, 'active': true})
        .then(orders => {
            if(orders.length > 0) {
                return res.status(200).json(orders);
            } else {
                return res.status(204).json({msg: 'Couldnt find any active orders'})
            }
        })
        .catch(err => res.status(400).json(err));
});

// @route GET api/orders/user/inactive/:id
// @desc get all inactive orders by userId route
// @access Private
router.get('/inactive', passport.authenticate('jwt', {session: false}), (req, res) => {
    Order.find({'userId': req.user.id, 'active': false})
    .then(orders => {
        if(orders.length > 0) {
            return res.status(200).json(orders);
        } else {
            return res.status(204).json({msg: 'Couldnt find any inactive orders'})
        }
    })
    .catch(err => res.status(400).json(err));
});

// @route PUT api/orders/update/:id
// @desc update order route
// @access Private
router.put('/update/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    if(req.user.role) {
        const { errors, isValid } = validateOrderInput(req.body);

        if(!isValid) {
            return res.status(400).json(errors);
        }

        //TODO: get real products from user and check if valid!
        // const userProducts = [
        //     {
        //         productName: "Pralin 1",
        //         price: 22,
        //         quantity: 5
        //     },
        //     {
        //         productName: "Pralin 2",
        //         price: 25,
        //         quantity: 2
        //     }
        // ];

        const updatedUserOrder = new Order({
            active: req.body.active,
            _id: req.params.id,
            userId: req.user.id,
            // orderedProducts: req.body.orderedProducts,
            orderedProducts: req.body.orderedProducts,
            customerName: req.body.customerName,
            street: req.body.street,
            zip: req.body.zip,
            city: req.body.city,
            email: req.body.email,
            totalSum: req.body.sum
        });
        // Order.findOneAndUpdate({_id: req.params.id}, {$set: updatedUserOrder}, {new: true})
        Order.findByIdAndUpdate(req.params.id, {$set: updatedUserOrder}, {new: true})
            .then(order => res.status(200).json(order))
            .catch(err => res.status(400).json(err));

    } else {
        return res.status(401).json({msg: 'You are not authorized to do this'});
    }
});
module.exports = router;