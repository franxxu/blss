const express = require('express');
const gameController = require('../controllers/gameController');

const router = express.Router();

router
  .route('/')
  .get(gameController.getAllGames)
  .post(gameController.createGame)
  .delete(gameController.deleteGames);

router
  .route('/:name')
  .get(gameController.getGameByName)
  .patch(gameController.updateGameByName)
  .delete(gameController.deleteGameByName);

module.exports = router;
