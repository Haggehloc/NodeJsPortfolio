const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const Notification = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },

  notificatedUser: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "users"
  },

  notification: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = NotificationSchema = mongoose.model(
  "notification",
  Notification
);
