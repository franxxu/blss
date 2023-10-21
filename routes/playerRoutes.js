const express = require('express');
const playerController = require('../controllers/playerController');

const router = express.Router();

//router.param('name', playerController.normalizeName);

router
  .route('/')
  .post(playerController.newPlayer)
  .get(playerController.allPlayers);

router
  .route('/:id')
  .get(playerController.getPlayerById)
  .post(playerController.modifyPlayer)
  .delete(playerController.deletePlayerById);

module.exports = router;
