const express = require('express');
const router = express.Router();
const passport = require('passport');

//Load models
const Product = require('../../models/Product');

// Load Input Validation
const validateProduct = require('../../validation/products');

// @route GET api/products/all
// @desc get all products route
// @access Private
router.get('/all', passport.authenticate('jwt', {session: false}), (req, res) => {
    Product.find()
        .then(products => {
            if(products.length > 0) {
                return res.status(200).json(products);
            } else {
                return res.status(204).json({msg: "Could not find any products"});
            }
        }).catch(err => res.status(400).json(err));
});

// @route GET api/products/:id
// @desc  get one product route
// @access public
router.get('/product/:id', (req, res) => {
    Product.findById(req.params.id)
        .then(prod => res.status(200).json(prod))
        .catch(err => res.status(400).json(err));
});

// @route GET api/products/active
// @desc  get all active products route
// @access public
router.get('/active', (req, res) => {
    Product.find({ 'available': true})
        .then(products => {
            if(products.length > 0) {
                return res.status(200).json(products);
            } else {
                return res.status(500).json({msg: 'Could not find any products'});
            }
        }).catch(err => res.status(400).json(err));
});

// @route POST api/products/
// @desc  create product route
// @access Private
router.post('/create', passport.authenticate('jwt', {session: false}), (req, res) => {
    
    // Check that input data is valid
    const { errors, isValid } = validateProduct(req.body);

    Product.findOne({ name: req.body.name})
        .then(prod => {
            if(prod) {
                errors.name = prod.name + ' already exists';
                return res.status(400).json(errors);
            } else {            
                if(!isValid) {
                    return res.status(400).json(errors);
                }
                const user = req.user;
            
                // Check if user has admin rights
                if(user.role) {
                    const newProd = new Product({
                        name: req.body.name,
                        ingredients: req.body.ingredients,
                        description: req.body.description,
                        image: req.body.image,
                        price: req.body.price,
                        weight: req.body.weight,
                        available: req.body.available
                    });
                    newProd.save()
                        .then(product => res.json(product))
                        .catch(err => res.json(err));
            
                } else {
                    return res.status(401).json("Not authorized");
                }
            }
        });
});

// @route update api/products/
// @desc  update product route
// @access Private
router.put('/update', passport.authenticate('jwt', {session: false}), (req, res) => {
    if(req.user.role) {
        // Check that input data is valid
        const { errors, isValid } = validateProduct(req.body);

        if(!isValid) {
            return res.status(400).json(errors);
        }
        // Get prod id from url
        const prodId = req.body.id;
        // Create new object from req.body
        const newProds = {};
        newProds.name = req.body.name;
        newProds.ingredients = req.body.ingredients;
        newProds.description = req.body.description;
        newProds.image = req.body.image;
        newProds.price = req.body.price;
        newProds.weight = req.body.weight;
        newProds.available = req.body.available;
        // Find product and update it
        Product.findByIdAndUpdate(prodId, {$set: newProds}, {new: true})
            .then(prod => res.json(prod))
            .catch(err => res.json(err));
    } else {
        return res.status(401).json({err: "Not authorized to do that"});
    }
        
});

// @route delete api/products/
// @desc  delete product
// @access Private
router.delete('/delete/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
    if(req.user.role) {
        Product.findById(req.params.id)
            .then(product => {
                product.remove()
                .then(() => {
                    res.status(200).json({msg: 'Product successfully deleted'});
                });                
            })
            .catch(() => res.status(404).json({msg: 'No product found'})); 
    } else {
        return res.status(401).json({msg: 'User not authorized'});
    }
});
module.exports = router;