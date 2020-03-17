const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const uFriends = require("./routes/api/ufriends");
const friends = require("./routes/api/friends");
const notification = require("./routes/api/notifications");
const soulSearch = require("./routes/api/soulSearch");
const getGames = require("./Services/idgb-api");
const localDbGames = require("./routes/api/Games");
const screenNames = require("./routes/api/GameHistory/ScreenNames");
const platforms = require("./routes/api/GameHistory/Platforms");
const games = require("./routes/api/GameHistory/Games");
const communities = require("./routes/api/GameHistory/Communities");

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB config
const db = require("./config/keys.js").mongoURI;

//Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true, useFindAndModify: false }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

//Use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.use("/api/ufriends", uFriends);
app.use("/api/friends", friends);
app.use("/api/notifications", notification);
app.use("/api/soulSearch", soulSearch);
app.use("/api/games", localDbGames);
app.use("/api/register/screennames", screenNames);
app.use("/api/register/platforms", platforms);
app.use("/api/register/games", games);
app.use("/api/register/communities", communities);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
