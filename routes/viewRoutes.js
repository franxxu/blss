const express = require('express');
const viewController = require('../controllers/viewController');

const router = express.Router();

router.get('/', viewController.getOverview);
router.get('/game/:id', viewController.getGame);

// router.all('/play', viewController.play);

router.get('/play', viewController.startGame);
router.post('/play', viewController.createGame);
router.post('/play', viewController.playGame);
router.post('/play/:id', viewController.updateGame);

router.post('/removeRound', viewController.modifyGame);

module.exports = router;
