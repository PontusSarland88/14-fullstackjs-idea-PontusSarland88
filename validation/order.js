const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateOrder(data) {
    let errors = {};

    // data.customerName = !isEmpty(data.customerName) ? data.customerName : '';
    data.street = !isEmpty(data.street) ? data.street : '';
    data.zip = !isEmpty(data.zip) ? data.zip : '';
    data.city = !isEmpty(data.city) ? data.city : '';
    data.email = !isEmpty(data.email) ? data.email : '';

    if(!Validator.isLength(data.customerName, {min: 3, max: 60})){
        errors.customerName = 'Name must be between 3 and 60 characters';
    }

    if(Validator.isEmpty(data.customerName)) {
        errors.customerName = 'Name field is required';
    } 

    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if(Validator.isEmpty(data.street)) {
        errors.street = 'Street field is required';
    }

    if(Validator.isEmpty(data.zip)) {
        errors.zip = 'Zip field is required';
    }

    if(Validator.isEmpty(data.city)) {
        errors.city = 'City field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};