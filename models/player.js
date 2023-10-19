const mongoose = require('mongoose');
const slugify = require('slugify');

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Player name is required'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  level: { type: Number, default: 0 },
  image: {
    type: String,
    default: function () {
      return `${this.name}.jpg`;
    },
  },
  slug: String,
});

playerSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Player = mongoose.model('Player', playerSchema);
module.exports = Player;
