const mongoose = require('mongoose');
const Game = require('../models/game');
const catchAsync = require('../utils/catchAsync');

const { ObjectId } = mongoose.Types;

const deleteGames = catchAsync(async (req, res, next) => {
  const result = await Game.deleteMany();
  res.status(200).json({ status: 'success', results: result });
});

const getAllGames = async (req, res) => {
  try {
    const games = await Game.aggregate([
      {
        $lookup: {
          from: 'players',
          localField: 'players.player_name',
          foreignField: 'name',
          as: 'players',
        },
      },
    ]);
    if (games.length === 0) {
      throw new Error('No game found');
    }
    res
      .status(200)
      .json({ status: 'success', results: games.length, data: { games } });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};

const getGameByName = async (req, res) => {
  try {
    // const game = await Game.findById(req.params.id);
    const game = await Game.aggregate([
      { $match: { _id: ObjectId(req.params.name) } },
      {
        $lookup: {
          from: 'players',
          localField: 'players.player_name',
          foreignField: 'name',
          as: 'players',
        },
      },
      {
        $addFields: { totalScore: { $sum: '$rounds.score' } },
      },
    ]);
    if (game.length === 0) {
      throw new Error(`Game ${req.params.name} not found`);
    }
    res
      .status(200)
      .json({ status: 'success', results: game.length, data: { game } });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};

const createGame = async (req, res) => {
  try {
    const newGame = await Game.create(req.body);
    res.status(201).json({
      status: 'success',
      results: 1,
      data: {
        newGame,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};

const updateGameByName = async (req, res) => {
  try {
    const game = await Game.findByIdAndUpdate(req.params.name, req.body, {
      new: true,
      runValidators: true,
    });
    if (!game) {
      throw new Error(`Game ${req.params.name} not found`);
    }
    res
      .status(200)
      .json({ status: 'success', results: game.length, data: { game } });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};

const deleteGameByName = async (req, res) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.name);
    if (!game) {
      throw new Error(`Game ${req.params.name} not found`);
    }
    res.status(200).json({
      status: 'success',
      results: 1,
      data: { game },
    });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};

module.exports = {
  // normalizeName,
  getAllGames,
  getGameByName,
  createGame,
  updateGameByName,
  deleteGameByName,
  deleteGames,
};
