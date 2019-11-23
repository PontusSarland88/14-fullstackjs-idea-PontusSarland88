const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');

// Load models
// const User = require('../../models/User');
const Product = require('../../models/Product');
const OrderRow = require('../../models/OrderRow'); 

// @route GET api/orderRows/create
// @desc Create orderRow route
// @access Public
router.post('/create/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            const newOrderRow = {};
            newOrderRow.productId = product.id;
            newOrderRow.quantity = req.body.quantity;
            console.log(newOrderRow); debugger;
            newOrderRow.save()
                .then(orderRow => res.status(200).json(orderRow))
                .catch(err => res.json(err));
        }).catch(err => res.json(err));
    
});

module.exports = router;