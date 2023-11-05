const Game = require('../models/game');
const catchAsync = require('../utils/catchAsync');
const Player = require('../models/player');
const AppError = require('../utils/appError');

const getGamesWon = () => {
  const stages = [
    {
      $match: {
        ended_at: {
          $exists: true,
        },
      },
    },
    {
      $group: {
        _id: '$winner',
        games_won: {
          $count: {},
        },
      },
    },
    {
      $sort: { games_won: -1 },
    },
    {
      $lookup: {
        from: 'players',
        localField: '_id',
        foreignField: '_id',
        as: 'player',
      },
    },
    {
      $project: {
        _id: 1,
        games_won: 1,
        player: { $arrayElemAt: ['$player', 0] },
      },
    },
  ];
  return Game.aggregate(stages);
};

const getAsLandlord = () => {
  const stages = [
    {
      $match: {
        ended_at: {
          $exists: true,
        },
      },
    },
    {
      $unwind: {
        path: '$rounds',
      },
    },
    {
      $group: {
        _id: '$rounds.landlord',
        asLandlord: {
          $count: {},
        },
      },
    },
    {
      $sort: { asLandlord: -1 },
    },
    {
      $lookup: {
        from: 'players',
        localField: '_id',
        foreignField: '_id',
        as: 'landlord',
      },
    },
    {
      $project: {
        _id: 1,
        asLandlord: 1,
        landlord: {
          $arrayElemAt: ['$landlord', 0],
        },
      },
    },
  ];
  return Game.aggregate(stages);
};

const getMaxScore = () => {
  const stages = [
    {
      $match: {
        ended_at: {
          $exists: true,
        },
      },
    },
    {
      $unwind: {
        path: '$players',
      },
    },
    {
      $sort: {
        'players.score': -1,
      },
    },
    {
      $limit: 3,
    },
    {
      $lookup: {
        from: 'players',
        localField: 'players.player',
        foreignField: '_id',
        as: 'player',
      },
    },
    {
      $project: {
        _id: 1,
        player: {
          $arrayElemAt: ['$player', 0],
        },
        score: '$players.score',
      },
    },
  ];
  return Game.aggregate(stages);
};

const getMaxRounds = () => {
  const stages = [
    {
      $match: {
        ended_at: {
          $exists: true,
        },
      },
    },
    {
      $project: {
        _id: 1,
        numberOfRounds: {
          $size: '$rounds',
        },
      },
    },
    {
      $sort: {
        numberOfRounds: -1,
      },
    },
    {
      $limit: 3,
    },
  ];

  return Game.aggregate(stages);
};

const getMaxBombs = () => {
  const stages = [
    {
      $match: {
        ended_at: {
          $exists: true,
        },
      },
    },
    {
      $unwind: {
        path: '$rounds',
      },
    },
    {
      $sort: {
        'rounds.bombs': -1,
      },
    },
    {
      $limit: 3,
    },
    {
      $project: {
        _id: 1,
        bombs: '$rounds.bombs',
      },
    },
  ];
  return Game.aggregate(stages);
};

const getMaxDuration = () => {
  const stages = [
    {
      $match: {
        ended_at: {
          $exists: true,
        },
      },
    },
    {
      $project: {
        _id: 1,
        duration: {
          $subtract: ['$ended_at', '$began_at'],
        },
      },
    },
    {
      $sort: {
        duration: -1,
      },
    },
    {
      $limit: 3,
    },
  ];
  return Game.aggregate(stages);
};

const getTotalGames = () => {
  const stages = [
    {
      $match: {
        ended_at: {
          $exists: true,
        },
      },
    },
    {
      $count: 'totalGames',
    },
  ];
  return Game.aggregate(stages);
};

const getTotalRounds = () => {
  const stages = [
    {
      $match: {
        ended_at: {
          $exists: true,
        },
      },
    },
    {
      $unwind: {
        path: '$rounds',
      },
    },
    {
      $count: 'totalRounds',
    },
  ];
  return Game.aggregate(stages);
};

const getStats = catchAsync(async (req, res, next) => {
  const gamesWon = await getGamesWon();
  const asLandlord = await getAsLandlord();
  const maxScore = await getMaxScore();
  const maxRounds = await getMaxRounds();
  const maxBombs = await getMaxBombs();
  const maxDuration = await getMaxDuration();
  const totalGames = await getTotalGames();
  const totalRounds = await getTotalRounds();

  res.status(200).render('stats', {
    title: '',
    gamesWon,
    asLandlord,
    maxScore,
    maxRounds,
    maxBombs,
    maxDuration,
    totalGames: totalGames[0].totalGames,
    totalRounds: totalRounds[0].totalRounds,
  });
});
// const getLandlordedGames = async (req, res) => {
//   try {
//     const game = await Game.aggregate([
//       { $unwind: '$rounds' },
//       {
//         $match: {
//           landlordID: ObjectId(req.params.playerid),
//         },
//       },
//     ]);
//   } catch (err) {
//     res.status(400).json({ status: 'error', message: err.message });
//   }
// };

// const getAllPlayedGames = async (req, res) => {
//   try {
//     const games = await Game.aggregate([
//       {
//         $match: {
//           playerIDs: {
//             $elemMatch: { playerID: ObjectId(req.params.playerid) },
//           },
//         },
//       },
//       {
//         $lookup: {
//           from: 'players',
//           localField: 'playerIDs.playerID',
//           foreignField: '_id',
//           as: 'players',
//         },
//       },
//       {
//         $addFields: { totalScore: { $sum: '$rounds.score' } },
//       },
//     ]);
//     if (games.length === 0) {
//       throw new Error('No game found');
//     }
//     res.status(200).json({ status: 'success', results: 1, data: { games } });
//   } catch (err) {
//     res.status(400).json({ status: 'error', message: err.message });
//   }
// };

module.exports = {
  getStats,
};
