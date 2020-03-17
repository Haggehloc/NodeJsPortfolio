const apicalypse = require("apicalypse");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const cron = require("node-cron");
const request = require("request-promise");

//load models
const GameId = require("../models/GameId");

offset = 0;
results = 0;

try {
  const scheduledSearch = cron.schedule(
    "5 5 5 5 5",
    () => {
      GameId.deleteMany({}, (err, removed) => {
        console.log("purging database of previous Id's");
      }).then(() => {
        saveGame(0, 20);
        saveGame(0, 25);
        saveGame(0, 30);

        console.log("The games have completed the saving routine.")
      })
  },
    {
      scheduled: true,
      timezone: "America/Sao_Paulo"
    }
  );
  console.log("The number of results being returned are: " + results);
} catch {
  console.log(typeof timePatternVar);
}

function saveGame(offset, startingPopularity) {


  const gamesRequestOptions = {
    queryMethod: "url",
    method: "get",
    uri: "https://api-v3.igdb.com/games/",
    headers: {
      "user-key": "dedffcef3e0479a5877a785cb1421cc9"
    },
    body:
    "where multiplayer_modes.onlinecoop = true | multiplayer_modes.onlinemax > 1 | multiplayer_modes.onlinecoopmax  > 1 & popularity > " + startingPopularity +  " & popularity < " + startingPopularity + 5 +"; fields name, popularity; limit 500; offset " + offset + ";",
    responseType: "application/json",
    timeout: 1000
  };
  request(gamesRequestOptions).then(gameId => {
    GameId.find()
      .then(() => {

        let gameJson = JSON.parse(gameId);
        console.log("The games are being saved");

        let i = 0;
        while(gameJson[i] != null){
          results += 1;
        let game = new GameId({
          id: gameJson[i].id,
          name: gameJson[i].name
        })

        game.save();
        console.log("The game being saved is: " + gameJson[i].name +  " it is number " + results + " of this run, " + "the offset is: " + offset);

        i++;
      }

      if(offset >= 5000){
        return;
      }


      saveGame((offset + 500), startingPopularity);

      });
  });
}

function sleep(time, callback) {
    var stop = new Date().getTime();
    while(new Date().getTime() < stop + time) {
        ;
    }
    callback();
}

function saveGame(offset, startingPopularity) {


  const gamesRequestOptions = {
    queryMethod: "url",
    method: "get",
    uri: "https://api-v3.igdb.com/games/",
    headers: {
      "user-key": "dedffcef3e0479a5877a785cb1421cc9"
    },
    body:
    "where multiplayer_modes.onlinecoop = true | multiplayer_modes.onlinemax > 1 | multiplayer_modes.onlinecoopmax  > 1 & popularity > " + startingPopularity +  " & popularity < " + startingPopularity + 5 +"; fields name, popularity; limit 500; offset " + offset + ";",
    responseType: "application/json",
    timeout: 1000
  };
  request(gamesRequestOptions).then(gameId => {
    GameId.find()
      .then(() => {

        let gameJson = JSON.parse(gameId);
        console.log("The games are being saved");

        let i = 0;
        while(gameJson[i] != null){
          results += 1;
        let game = new GameId({
          id: gameJson[i].id,
          name: gameJson[i].name
        })

        game.save();
        console.log("The game being saved is: " + gameJson[i].name +  " it is number " + results + " of this run, " + "the offset is: " + offset);

        i++;
      }

      if(offset >= 5000){
        return;
      }


      saveGame((offset + 500), startingPopularity);

      });
  });
}

function sleep(time, callback) {
    var stop = new Date().getTime();
    while(new Date().getTime() < stop + time) {
        ;
    }
    callback();
}



module.exports = router;
