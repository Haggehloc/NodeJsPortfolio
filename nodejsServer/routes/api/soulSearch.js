const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const cron = require("node-cron");

//load models
const Friend = require("../../models/friends");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Notification = require("../../models/Notifications");
const SoulSearch = require("../../models/SoulSearch");

// @route GET api/soulSearch/test
// @desc Tests post routes
// @access Public
router.get("/test", (req, res) =>
  res.json({
    msg: "soulSearch Works"
  })
);

// @route POST api/soulSearch
// @desc posts a new soulSearch
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const newSoulSearch = new SoulSearch({
      user: req.user.id,
      soulHandle: req.body.soulHandle
    });

    newSoulSearch.save().then(soulSearch => res.json(soulSearch));
  }
);

// @route GET api/soulSearch
// @desc get all users notifications
// @access Public
router.get(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    SoulSearch.find({ user: req.user.id })
      .then(soulSearch => res.json(soulSearch))
      .catch(err =>
        res.status(404).json({
          nopostfound: "No soulSearch found"
        })
      );
  }
);

// var scheduledSearch = cron.schedule(
//   "* * * * *",
//   () => {
//     SoulSearch.find().then(soulSearches => {
//       soulSearches.forEach(soulSearch => {
//         console.log(soulSearch);
//         Profile.findOne({ handle: soulSearch.handle }).then(found => {
//           {
//             console.log(found);
//             const newNotification = new Notification({
//               user: found.user,
//               notification:
//                 "We have found a new person you may know, the handle for them is: " +
//                 found.handle,
//               notificatedUser: soulSearch.user
//             });
//
//             newNotification.save().then(notification => res.json(notification));
//           }
//         });
//       });
//     });
//   },
//   {
//     scheduled: true,
//     timezone: "America/Sao_Paulo"
//   }
// );
//
// scheduledSearch.start();
// console.log(scheduledSearch.running);

module.exports = router;
