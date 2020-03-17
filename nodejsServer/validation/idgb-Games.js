const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateGamesInput(data) {
  let errors = {};

  if(data.size > 0){
    err.name = "There was already a game in the system by that name";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
