const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    genre: {
      type: String,
      default: 'Drama',
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/300x450?text=Movie',
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 10,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Movie', movieSchema);