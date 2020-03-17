const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const FriendSchema = new Schema({
  initialUser: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },

  secondaryUser: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },

  initialAccepted: {
    type: Boolean,
    default: false
  },

  initialSecondary: {
    type: Boolean,
    default: false
  },

  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Friends = mongoose.model("friends", FriendSchema);
