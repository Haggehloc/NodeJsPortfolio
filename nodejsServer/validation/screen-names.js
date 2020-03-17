const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateScreenNameInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : "";

    if (!Validator.isLength(data.name, { min: 3, max: 40 })) {
        errors.name = "Screen Name needs to be between 3 and 40 characters";
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = "Name is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
