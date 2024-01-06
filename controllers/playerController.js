const multer = require('multer');
const Player = require('../models/player');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const fsUtils = require('../utils/fsUtils');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img');
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.')[1];
    cb(null, `player-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Image only!', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadUserImage = upload.single('image');

const allPlayers = catchAsync(async (req, res, next) => {
  const players = await Player.find();
  res.status(200).render('player', {
    title: 'All Players',
    players,
  });
});

const newPlayer = catchAsync(async (req, res, next) => {
  await Player.create({ name: req.body.name, image: req.file.filename });
  allPlayers(req, res, next);
});

const modifyPlayer = catchAsync(async (req, res, next) => {
  const player = { name: req.body.name };
  if (req.file) player.image = req.file.filename;
  const oldPLayer = await Player.findByIdAndUpdate(req.params.id, player);
  if (req.file) fsUtils.cleanUpImage(oldPLayer.image);
  allPlayers(req, res, next);
});

const deletePlayer = catchAsync(async (req, res, next) => {
  const player = await Player.findByIdAndDelete(req.params.id);
  fsUtils.cleanUpImage(player.image);
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
  const aPlayer = await Player.create(req.body);
  res.status(201).json({
    status: 'success',
    results: 1,
    data: {
      aPlayer,
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
  uploadUserImage,
  deletePlayer,
  modifyPlayer,
  allPlayers,
  newPlayer,
  getAllPlayers,
  getPlayerById,
  createPlayer,
  updatePlayerById,
  deletePlayerById,
};
