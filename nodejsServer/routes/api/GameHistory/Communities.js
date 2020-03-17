const express = require("express");
const router = express.Router();
const passport = require("passport");

//load models
const Community = require("../../../models/game-history/Communities");
const ScreenName = require("../../../models/game-history/ScreenName");

// @route GET api/register/platforms/test
// @desc Tests post routes
// @access Public
router.get("/test", (req, res) =>
    res.json({
        msg: "communities Works"
    })
);

// @route POST api/register/platforms
// @desc Posts a new platform to the logged in user
// @access Private
router.post(
    "/",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {

        ScreenName.findOne({name: req.body.screenName})
            .then(screenName => {

                const community = new Community({
                    screenName: req.body.screenName,
                    user: req.user.id,
                    name: req.body.name
                });

                Community.findOne({
                    name: community.name
                })
                    .then(name => {
                        if (name) {
                            errors.name = "That community already exists";
                            res.status(400).json(errors);
                        }
                        ;

                        new Community(community).save().then(name => res.json(name));
                    })
            })
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
        Community.findOne({name: req.body.name})
            .then(community => res.json(community))
            .catch(err => {
                res.status(404).json({
                    noGamesFound: "No communities found"
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
        Community.findOne({name: req.body.name})
            .then(community => {
                community.remove().then(() =>
                    res.json({
                        success: true
                    })
                );
            })
            .catch(err => {
                res.status(404).json({
                    noGamesFound: "No communities found"
                })
            })
    });

module.exports = router;