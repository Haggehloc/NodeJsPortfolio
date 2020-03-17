const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//load models
const Friend = require("../../models/friends");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Notification = require("../../models/Notifications");

// @route GET api/notification/test
// @desc Tests post routes
// @access Public
router.get("/test", (req, res) =>
  res.json({
    msg: "notifications Work"
  })
);

// @route POST api/notification/new/:id
// @desc adds a new notification
// @access Private
router.post(
  "/new/:id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const newNotification = new Notification({
      user: req.user.id,
      notification: req.body.notification,
      notificatedUser: req.params.id
    });

    newNotification.save().then(notification => res.json(notification));
  }
);

// @route GET api/notifications
// @desc get all users notifications
// @access Public
router.get(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Notification.find({ notificatedUser: req.user.id })
      .then(notifications => res.json(notifications))
      .catch(err =>
        res.status(404).json({
          nopostfound: "No notifications found"
        })
      );
  }
);

// @route DELETE api/notifications/:id
// @desc Deletes the given notification
// @access Private
// @route DELETE api/posts/:id
// @desc delete post by id
// @access Private
router.delete(
  "/:id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Notification.findById(req.params.id)
      .then(notification => {
        // DELETE
        notification.remove().then(() =>
          res.json({
            success: true
          })
        );
      })
      .catch(err =>
        res.status(404).json({
          notificationNotFound: "No notifications found"
        })
      );
  }
);

module.exports = router;
