const mongoose = require('mongoose');
const slugify = require('slugify');

const roundSchema = new mongoose.Schema({
  base_score: Number,
  bombs: Number,
  spring: Boolean,
  landlord: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
  },
  won: Boolean,
  landlord_score: Number,
  peasant_score: Number,
});

const gameSchema = new mongoose.Schema({
  rounds: [roundSchema],
  players: [
    {
      player: { type: mongoose.Schema.ObjectId, ref: 'Player' },
      score: { type: Number, default: 0 },
    },
  ],
  winner: { type: mongoose.Schema.ObjectId, ref: 'Player' },
  began_at: { type: Date, default: Date.now },
  ended_at: { type: Date },
  slug: String,
});

gameSchema.pre('save', function (next) {
  this.slug = slugify(new Date().toDateString(), { lower: true });
  next();
});

gameSchema.methods.pushRound = function (newRound) {
  const score = newRound.base_score * 2 ** (newRound.bombs + newRound.spring);

  newRound.peasant_score = newRound.won ? score * -1 : score;
  newRound.landlord_score = newRound.peasant_score * -1 * 2;
  let tempScore = 0;
  this.players.forEach((player) => {
    if (player.player._id.toString() === newRound.landlord) {
      player.score += newRound.landlord_score;
    } else {
      player.score += newRound.peasant_score;
    }
    if (tempScore < player.score) {
      this.winner = player.player._id;
      tempScore = player.score;
    }
  });
  this.rounds.push(newRound);
};

gameSchema.methods.pullRound = function (roundId) {
  const theRound = this.rounds.find(
    (round) => round._id.toString() === roundId,
  );
  let tempScore = 0;
  this.players.forEach((player) => {
    if (player.player._id.toString() === theRound.landlord.toString()) {
      player.score -= theRound.landlord_score;
    } else {
      player.score -= theRound.peasant_score;
    }
    if (tempScore < player.score) {
      this.winner = player.player._id;
      tempScore = player.score;
    }
  });
  this.rounds.pull({ id: roundId });
};

gameSchema.methods.getPlayerScore = function (player) {
  let score = 0;
  this.players.forEach((element) => {
    if (element.player._id.toString() === player._id.toString()) {
      score = element.score;
    }
  });
  return score;
};

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;
