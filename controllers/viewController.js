const mongoose = require('mongoose');
const Game = require('../models/game');
const catchAsync = require('../utils/catchAsync');
const Player = require('../models/player');
const AppError = require('../utils/appError');

exports.getOverview = catchAsync(async (req, res, next) => {
  //games with no ended_at are considered just created not yet played.
  const games = await Game.find({ ended_at: { $not: { $eq: null } } }).populate(
    ['winner', 'players.player', 'rounds.landlord'],
  );
  res.status(200).render('overview', {
    title: 'All Games',
    games,
  });
});

exports.getGame = catchAsync(async (req, res, next) => {
  const game = await Game.findById(req.params.id);
  res.status(200).render('game', {
    title: 'Game Details',
    game,
  });
});

exports.startGame = catchAsync(async (req, res, next) => {
  const players = await Player.find();
  res.status(200).render('startGame', {
    title: '开始新游戏',
    players,
  });
});

exports.createGame = catchAsync(async (req, res, next) => {
  const aGame = { began_at: Date.now() };
  if (req.body.players.length !== 3)
    throw new AppError('3 players has to be selected to start a game', 400);
  aGame.players = req.body.players.map((p) => ({ player: p }));
  const newGame = await Game.create(aGame);
  req.app.param.id = newGame._id;
  next();
});

exports.playGame = catchAsync(async (req, res, next) => {
  const id = req.params.id || req.app.param.id;
  const game = await Game.findById(id).populate(['players.player']);
  res.status(200).render('playGame', {
    title: '游戏开始',
    game,
  });
});

exports.updateGame = catchAsync(async (req, res, next) => {
  const newRound = {
    landlord: req.body.landlord,
    base_score: +req.body.base_score,
    bombs: +req.body.bombs,
    won: !!req.body.won,
    spring: !!req.body.spring,
  };

  let game = await Game.findById(req.params.id);
  game.pushRound(newRound);
  game.ended_at = Date.now();
  game = await game.save();
  await game.populate(['winner', 'players.player', 'rounds.landlord']);
  res.status(200).render('playGame', {
    title: '游戏开始',
    game,
  });
});

exports.modifyGame = catchAsync(async (req, res, next) => {
  console.log(req.body.gameId, req.body.roundId);
  let game = await Game.findById(req.body.gameId);
  game.pullRound(req.body.roundId);
  game = await game.save();
  await game.populate(['winner', 'players.player', 'rounds.landlord']);
  res.status(200).render('playGame', {
    title: '游戏开始',
    game,
  });
});
