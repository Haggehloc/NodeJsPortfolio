const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    screenName: {
        type: String,
    },
    name: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Game = mongoose.model("game", GameSchema);