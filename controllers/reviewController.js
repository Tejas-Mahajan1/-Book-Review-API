const Review = require("../models/Review");

exports.addReview = async (req, res) => {
  const { id: bookId } = req.params;
  const { rating, comment } = req.body;
  if (!rating) return res.status(400).json({ error: "Rating required" });

  try {
    const review = new Review({
      book: bookId,
      user: req.user._id,
      rating,
      comment,
    });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: "You have already reviewed this book" });
  }
};

exports.updateReview = async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  const review = await Review.findById(id);
  if (!review) return res.status(404).json({ error: "Review not found" });
  if (!review.user.equals(req.user._id))
    return res.status(403).json({ error: "Not your review" });

  if (rating) review.rating = rating;
  if (comment) review.comment = comment;
  await review.save();
  res.json(review);
};

exports.deleteReview = async (req, res) => {
  const { id } = req.params;
  const review = await Review.findById(id);
  if (!review) return res.status(404).json({ error: "Review not found" });
  if (!review.user.equals(req.user._id))
    return res.status(403).json({ error: "Not your review" });

  await review.deleteOne();
  res.json({ message: "Review deleted" });
};
