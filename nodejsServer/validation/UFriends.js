const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateUFriendInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (!Validator.isLength(data.handle, { min: 5, max: 20 })) {
    errors.handle = "Handle must be between 5 and 20 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
