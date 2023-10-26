const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });
// const fs = require('fs');
const Game = require('../models/game');
// const Player = require('../models/player');

const dropDB = async () => {
  await mongoose.connection.dropDatabase();
};

// const loadPlayer = async () => {
//   const data = JSON.parse(
//     fs.readFileSync(`${__dirname}/data/playerData.json`, 'utf8'),
//   );
//   return Player.create(data);
// };

const cleanGames = () => Game.deleteMany({ ended_at: { $eq: null } });

mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => {
    console.log('Connected to database');
    console.log('cleaning games...');
    return cleanGames();
  })
  .then((result) => {
    console.log('Cleaning result: ', result);
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
