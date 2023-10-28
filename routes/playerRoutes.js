const express = require('express');
const playerController = require('../controllers/playerController');

const router = express.Router();

router.get('/', playerController.allPlayers);
router.get('/:id', playerController.getPlayerById);

router.post(
  '/create',
  playerController.uploadUserImage,
  playerController.newPlayer,
);
router.post(
  '/update/:id',
  playerController.uploadUserImage,
  playerController.modifyPlayer,
);
router.post('/delete/:id', playerController.deletePlayer);

module.exports = router;
