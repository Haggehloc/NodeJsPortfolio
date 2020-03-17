const express = require("express");
const router = express.Router();
const passport = require("passport");

//load models
const Platform = require("../../../models/game-history/Platforms");
const ScreenName = require("../../../models/game-history/ScreenName");

// @route GET api/register/platforms/test
// @desc Tests post routes
// @access Public
router.get("/test", (req, res) =>
    res.json({
        msg: "platforms Works"
    })
);

// @route POST api/register/platforms
// @desc Posts a new platform to the logged in user
// @access Private
router.post(
    "/:name/:platform",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {

        if (req.params.platform != 'undefined' && req.params.name != 'undefined') {

            Platform.findOne({name: req.params.platform})
                .then(game => {

                    const newPlatform = new Platform({
                        screenName: req.params.name,
                        user: req.user.id,
                        name: req.params.game
                    });

                    Platform.findOne({
                        name: newPlatform.name
                    })
                        .then(name => {

                            new Platform(newPlatform).save().then(name => res.json(name));
                        })
                })
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
        Platform.findOne({name: req.body.name})
            .then(platform => res.json(platform))
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