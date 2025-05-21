const Book = require("../models/Book");
const Review = require("../models/Review");

exports.addBook = async (req, res) => {
  const { title, author, genre, description } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });
  const book = new Book({
    title,
    author,
    genre,
    description,
    createdBy: req.user._id,
  });
  await book.save();
  res.status(201).json(book);
};

exports.getBooks = async (req, res) => {
  const { page = 1, limit = 10, author, genre } = req.query;
  const filter = {};
  if (author) filter.author = new RegExp(author, "i");
  if (genre) filter.genre = new RegExp(genre, "i");
  const books = await Book.find(filter)
    .skip((page - 1) * limit)
    .limit(Number(limit));
  res.json(books);
};

exports.getBookById = async (req, res) => {
  const { id } = req.params;
  const { page = 1, limit = 5 } = req.query;
  const book = await Book.findById(id);
  if (!book) return res.status(404).json({ error: "Book not found" });

  // Get reviews and average rating
  const reviews = await Review.find({ book: id })
    .populate("user", "username")
    .skip((page - 1) * limit)
    .limit(Number(limit));
  const avg = await Review.aggregate([
    { $match: { book: book._id } },
    { $group: { _id: null, avgRating: { $avg: "$rating" } } },
  ]);
  res.json({
    ...book.toObject(),
    averageRating: avg[0]?.avgRating || null,
    reviews,
  });
};

exports.searchBooks = async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "Query required" });
  const regex = new RegExp(q, "i");
  const books = await Book.find({
    $or: [{ title: regex }, { author: regex }],
  });
  res.json(books);
};
