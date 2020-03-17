const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScreenNameSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users"
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

module.exports = Screeenname = mongoose.model("screenname", ScreenNameSchema);