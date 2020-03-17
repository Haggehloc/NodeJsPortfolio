const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const request = require("request-promise");
const validator = require("../../validation/idgb-Games");

//load models
const GameId = require("../../models/GameId");
const VerifiedGame = require("../../models/VerifiedGame")

// @route POST api/games
// @desc add game to db
// @access Private
router.post(
  "",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    GameId.findOne({ name: req.handle }, (req) => {
    }).then(() => {
      const newGame = new Game({
        id: req.body.id,
        name: req.body.name
      });

      newGame
        .save()
        .then(Game => res.json(Game));
    })
    .catch(err =>
      res.status(404).json({
        nogamesfound: "No games found"
      })
    );
  }
);

// @route GET api/games/:id
// @desc get Game by id
// @access Private
router.get(
  "/:id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    VerifiedGame.findOne({id: req.params.id})
      .then(gameSchema => res.json(gameSchema))
      .catch(err =>
        res.status(404).json({
          noGamesFound: "No games found"
        })
      );
  }
);

// @route POST api/games/unverified
// @desc add verified game to db from the verified collection
// @access Private
router.post(
  "/unverified",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    GameId.findOne({ 'name': req.body.name }, req => {

    }).then(game => {
      if(game !== null){
      console.log("The game is: " + game);
      const newGame = new VerifiedGame({
        identificationNum: game.id,
        name: game.name
      });

      newGame
        .save()
        .then(VerifiedGame => res.json(newGame))
        .catch(err => res.status(404).json({
          nopostfound: 'No game found with that name ' + err
        }));
      }

      else{
        res.status(404).json({
          nopostfound: 'No game found with that name' + req.body.name
        })
      }
    })
    .catch(err => res.status(404).json({
      nopostfound: 'No game found with that name ' + err
    }));
  }
);


// @route DELETE api/games/:id
// @desc delete game by id
// @access Private
router.delete(
  "/:id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    VerifiedGame.findById(req.params.id)
      .then(game => {
        // DELETE
        game.remove().then(() =>
          res.json({
            success: true
          })
        );
      })
      .catch(err =>
        res.status(404).json({
          notificationNotFound: "No games found" + err
        })
      );
  }
);

// @route GET api/games/
// @desc get all games
// @access Public
router.get(
  "/",
  (req, res) =>{
    VerifiedGame.find().then(games => {
      res.json(games)
    })
  }
);

module.exports = router;
