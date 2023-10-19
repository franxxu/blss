const express = require('express');
const playerController = require('../controllers/playerController');

const router = express.Router();

//router.param('name', playerController.normalizeName);

router
  .route('/')
  .get(playerController.getAllPlayers)
  .post(playerController.createPlayer);

router
  .route('/:id')
  .get(playerController.getPlayerById)
  .patch(playerController.updatePlayerById)
  .delete(playerController.deletePlayerById);

module.exports = router;
