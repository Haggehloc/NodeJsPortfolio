const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//load models
const Friend = require("../../models/friends");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route GET api/friends/test
// @desc Tests post routes
// @access Public
router.get("/test", (req, res) =>
  res.json({
    msg: "friends Works"
  })
);

// @route GET api/friends
// @desc get unregistered friends
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {0
    Friend.find()
      .or([{ initialUser: req.user.id }, { secondaryUser: req.user.id }])
      .and({ initialAccepted: true })
      .and({ initialSecondary: true })
      .then(friendSchema => res.json(friendSchema))
      .catch(err =>
        res.status(404).json({
          nofavoritesfound: "No friends found"
        })
      );
  }
);

// @route GET api/friends/requests
// @desc get friend requests
// @access Private
router.get(
  "/requests",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Friend.find()
      .and({ secondaryUser: req.user.id })
      .and({ initialAccepted: true })
      .and({ initialSecondary: false })
      .then(friendSchema => res.json(friendSchema))
      .catch(err =>
        res.status(404).json({
          nofavoritesfound: "No friends found"
        })
      );
  }
);

// @route POST api/friends/:handle
// @desc add friend
// @access Private
router.post(
  "/:handle",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Profile.findOne({ handle: req.params.handle }).then(profile => {
      const newFriend = new Friend({
        initialAccepted: true,
        secondaryUser: profile.user,
        initialUser: req.user.id
      });

      newFriend
        .save()
        .then(Friend => res.json(Friend))
        .catch(err =>
          res.status(404).json({
            friendnotfound: "No people found with that handle"
          })
        );
    });
  }
);

// @route PUT api/friends/requests/:id
// @desc accept friend request
// @access Private
router.put(
  "/requests/:id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Friend.findById(req.params.id).then(friendRequest => {
      friendRequest.set("initialSecondary", "true");
      friendRequest
        .save()
        .then(friendRequest => res.json(friendRequest))
        .catch(err =>
          res
            .status(404)
            .json({ friendRequestNotFound: "No friend request found" })
        );
    });
  }
);

module.exports = router;
