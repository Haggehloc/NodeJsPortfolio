const express = require("express");
const router = express.Router();
const passport = require("passport");

//load models
const Game = require("../../../models/game-history/Games");
const ScreenName = require("../../../models/game-history/ScreenName");

const validateScreenNameInput = require("../../../validation/platforms");


// @route GET api/register/platforms/test
// @desc Tests post routes
// @access Public
router.get("/test", (req, res) =>
    res.json({
        msg: "games Works"
    })
);

// @route POST api/register/games
// @desc Posts a new game to the logged in user
// @access Private
router.post(
    "/:name/:game",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {

        if (req.params.game != 'undefined' && req.params.name != 'undefined') {

            Game.findOne({name: req.params.game})
                .then(game => {

                    const newGame = new Game({
                        screenName: req.params.name,
                        user: req.user.id,
                        name: req.params.game
                    });

                    Game.findOne({
                        name: newGame.name
                    })
                        .then(name => {

                            new Game(newGame).save().then(name => res.json(name));
                        })
                })
        }
    }
);

// @route GET api/register/screennames
// @desc Gets all screen names associated with the user
// @access Private
router.get("/all",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        Game.find({user: req.user.id})
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
        Platform.findOne({name: req.body.name})
            .then(platform => {
                platform.remove().then(() =>
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
    });

module.exports = router;