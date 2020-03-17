const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const UFriendSchema = require("../../models/UFriends");
const Profile = require("../../models/Profile");

// Validation
const validateUFriendInput = require("../../validation/UFriends");

// @route GET api/ufriends/test
// @desc Tests post routes
// @access Public
router.get("/test", (req, res) =>
  res.json({
    msg: "Ufriends Works"
  })
);

// @route GET api/ufriends
// @desc get unregistered friends
// @access Public
router.get("/", (req, res) => {
  UFriends.find()
    .then(uFriendSchema => res.json(uFriendSchema))
    .catch(err =>
      res.status(404).json({
        nofavoritesfound: "No ufriend found with that ID"
      })
    );
});

// @route POST api/ufriends
// @desc post unregistered friends
// @access Private

module.exports = router;
