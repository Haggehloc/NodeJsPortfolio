const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlatformSchema = new Schema({
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
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Platform = mongoose.model("platform", PlatformSchema);