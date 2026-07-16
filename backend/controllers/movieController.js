const Movie = require('../models/Movie');

exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addMovie = async (req, res) => {
  try {
    const { title, description, genre, image, rating } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const movie = await Movie.create({
      title,
      description,
      genre,
      image,
      rating,
    });

    res.status(201).json({
      message: 'Movie added successfully',
      movie,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};