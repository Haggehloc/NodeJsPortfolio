const express = require("express");
const router = express.Router();
const passport = require("passport");

//load models
const ScreenName = require("../../../models/game-history/ScreenName");
const validateScreenNameInput = require("../../../validation/screen-names");


// @route GET api/register/screennames/test
// @desc Tests post routes
// @access Public
router.get("/test", (req, res) =>
    res.json({
        msg: "screen names Works"
    })
);

// @route POST api/register/screennames
// @desc Posts a new screen name to the logged in user
// @access Private
router.post(
    "/:name",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        if (req.params.name != 'undefined') {

            const screenName = new ScreenName({
                user: req.user.id,
                name: req.params.name
            });


            new ScreenName(screenName).save().then(name => res.json(name));
        }
    }
);

// @route GET api/register/screennames
// @desc Gets all screen names associated with the user
// @access Private
router.get("/",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        ScreenName.findOne({name: req.body.name})
            .then(screenName => res.json(screenName))
            .catch(err => {
                res.status(404).json({
                    noGamesFound: "No games found"
                })
            })
    });

// @route GET api/register/screennames
// @desc Gets all screen names associated with the user
// @access Private
router.get("/all",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        ScreenName.find({user: req.user.id})
            .then(screenName => res.json(screenName))
            .catch(err => {
                res.status(404).json({
                    noGamesFound: "No games found"
                })
            })
    });

// @route DELETE api/register/screennames
// @desc Deletes the given screen name from the user
// @access Private
router.delete("/",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        ScreenName.findOne({name: req.body.name})
            .then(screenName => {
                screenName.remove().then(() =>
                    res.json({
                        success: true
                    })
                );
            })
            .catch(err => {
                res.status(404).json({
                    noGamesFound: "No games found"
                })
            })
    })

module.exports = router;