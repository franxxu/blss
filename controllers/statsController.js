const mongoose = require('mongoose');
const Game = require('../models/game');
const Player = require('../models/player');

const { ObjectId } = mongoose.Types;

const getLandlordedGames = async (req, res) => {
  try {
    const game = await Game.aggregate([
      { $unwind: '$rounds' },
      {
        $match: {
          landlordID: ObjectId(req.params.playerid),
        },
      },
    ]);
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};

const getAllPlayedGames = async (req, res) => {
  try {
    const games = await Game.aggregate([
      {
        $match: {
          playerIDs: {
            $elemMatch: { playerID: ObjectId(req.params.playerid) },
          },
        },
      },
      {
        $lookup: {
          from: 'players',
          localField: 'playerIDs.playerID',
          foreignField: '_id',
          as: 'players',
        },
      },
      {
        $addFields: { totalScore: { $sum: '$rounds.score' } },
      },
    ]);
    if (games.length === 0) {
      throw new Error('No game found');
    }
    res.status(200).json({ status: 'success', results: 1, data: { games } });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};

module.exports = {
  getLandlordedGames,
  getAllPlayedGames,
};
