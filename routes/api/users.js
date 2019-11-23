const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load user model
const User = require('../../models/User');

// @route POST api/users/register
// @desc Register users route
// @access Public
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body, true);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email })
        .then( user => {
            if(user) {
                errors.email = 'Email already exists';
                return res.status(400).json(errors);
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            }
        });
});

// @route GET api/users/login
// @desc Login User / Returning JWT token
// @access Public
router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({email})
        .then(user => {
            if(!user) {
                errors.email = 'User not found';
                return res.status(404).json(errors);
            }

            // Check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        // User Matched
                        const payload = { id: user.id, name: user.name, userRole: user.role } // Create JWT Payload

                        // Sign Token
                        jwt.sign(
                            payload, 
                            keys.secretOrKey, 
                            {expiresIn: 5600}, 
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token,
                                    userRole: user.role,
                                });
                        });
                    } else {
                        errors.password = 'Password incorrect';
                        return res.status(400).json(errors);
                    }
                });
        });
});

// @route GET api/users/current
// @desc Return current User
// @access private
router.get('/current', passport.authenticate('jwt', { session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        userRole: req.res.userRole,
    });
});

// @route GET api/users/all
// @desc Return all Users
// @access private
router.get('/all', passport.authenticate('jwt', {session: false}), (req, res) => {
   if(req.user.role) {
       User.find()
       .then(users =>  res.status(200).json(users))
       .catch(err => res.status(500).json(err));
   } else {
       return res.status(401).json({msg: 'User not authorized'});
   }
});

// @route GET api/users/:id
// @desc Return one user from id
// @access private
router.get('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    if(req.user.role) {
        User.findById(req.params.id)
        .then(user => res.status(200).json(user))
        .catch(err => res.status(400).json(err));
    } else {
        return res.status(401).json({msg: 'User not authorized'});
    }
});

// @route put api/users/update/:id
// @desc Update one user
// @access private
router.put('/update/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    if(req.user.role) {
        const { errors, isValid } = validateRegisterInput(req.body, false);

        if(!isValid) {
            return res.status(400).json(errors);
        }
        const userId = req.params.id;
        const newUser = {};
        newUser.role = req.body.role;
        newUser.email = req.body.email;
        newUser.name = req.body.name;

        User.findOne({ email: req.body.email })
            .then(user => {
                if(user) {
                    errors.email = 'Email already exists';
                    return res.status(400).json(errors);
                } else {
                    User.findByIdAndUpdate(userId, {$set: newUser}, {new: true})
                        .then(user => res.status(200).json(user))
                        .catch(err => res.json(err));
            }});
    } else {
        return res.status(401).json({msg: 'Not authorized to do that'});
    }
});

// @route delete api/users/delete/:id
// @desc Delete one user
// @access private
router.delete('/delete/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
    if(req.user.role) {
        User.findById(req.params.id)
            .then(user => {
                user.remove()
                .then(() => {
                    res.status(200).json({msg: 'User successfully deleted'});
                });                
            })
            .catch(() => res.status(404).json({msg: 'No user found'})); 
    } else {
        return res.status(401).json({msg: 'You are not authorized to do that'});
    }
});

module.exports = router;