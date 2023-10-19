const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });
const fs = require('fs');
const Game = require('../models/game');
const Player = require('../models/player');

const dropDB = async () => {
  await mongoose.connection.dropDatabase();
};

const loadPlayer = async () => {
  const data = JSON.parse(
    fs.readFileSync(`${__dirname}/data/playerData.json`, 'utf8'),
  );
  return Player.create(data);
};

const loadGame = async () => {
  const data = JSON.parse(
    fs.readFileSync(`${__dirname}/data/gameData.json`, 'utf8'),
  );
  return Game.create(data);
};

mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => {
    console.log('Connected to database');
    console.log('Dropping database...');
    return dropDB();
  })
  .then(() => {
    console.log('Database dropped');
    console.log('Loading players...');
    return loadPlayer();
  })
  .then(() => {
    console.log('Players loaded');
    console.log('Loading games...');
    return loadGame();
  })
  .then(() => {
    console.log('Games loaded');
  })
  .catch((err) => {
    console.log('Exception happened: ', err);
  })
  .finally(() => {
    console.log('All done, Closing connection');
    mongoose.connection.close().then(() => {
      console.log('Connection closed');
    });
  });
