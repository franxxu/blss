const Player = require('../models/player');
const catchAsync = require('../utils/catchAsync');

//route handler
// const normalizeName = (req, res, next, val) => {
//   const name = val.trim().toLowerCase();
//   req.params.name = name;
//   next();
// };

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {}
}
const allPlayers = catchAsync(async (req, res, next) => {
  const players = await Player.find();
  res.status(200).render('player', {
    title: 'All Players',
    players,
  });
});

const newPlayer = catchAsync(async (req, res, next) => {
  await Player.create(req.body);
  allPlayers(req, res, next);
});

const modifyPlayer = catchAsync(async (req, res, next) => {
  if (req.body['delete.x']) {
    await Player.findByIdAndDelete(req.params.id);
  } else {
    await Player.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
  }
  allPlayers(req, res, next);
});

const getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find();
    if (players.length === 0) {
      throw new Error('No players found');
    }
    res.status(200).json({ status: 'success', results: 1, data: { players } });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};

const getPlayerById = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      throw new Error(`Player ${req.params.id} not found`);
    }
    res.status(200).json({ status: 'success', results: 1, data: { player } });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};

const createPlayer = catchAsync(async (req, res, next) => {
  const newPlayer = await Player.create(req.body);
  res.status(201).json({
    status: 'success',
    results: 1,
    data: {
      newPlayer,
    },
  });
  next();
});

const updatePlayerById = async (req, res) => {
  try {
    const player = await Player.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!player) {
      throw new Error(`Player ${req.params.id} not found`);
    }
    res.status(200).json({ status: 'success', results: 1, data: { player } });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};

const deletePlayerById = async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);
    if (!player) {
      throw new Error(`Player ${req.params.id} not found`);
    }
    res.status(200).json({
      status: 'success',
      results: 1,
      data: { player },
    });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};

module.exports = {
  // normalizeName,
  modifyPlayer,
  allPlayers,
  newPlayer,
  getAllPlayers,
  getPlayerById,
  createPlayer,
  updatePlayerById,
  deletePlayerById,
};
