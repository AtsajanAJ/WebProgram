// const Review = require('../models/review.model');

// // Create a new review
// const createReview = (req, res) => {
//     if (!req.body) {
//         res.status(400).send({ message: 'Content cannot be empty.' });
//     }

//     const newReview = new Review({
//         recipeId: req.body.recipeId,
//         userId: req.body.userId,
//         rating: req.body.rating,
//         comment: req.body.comment,
//     });

//     Review.create(newReview, (err, data) => {
//         if (err) {
//             res.status(500).send({ message: err.message || 'Some error occurred while creating the review.' });
//         } else {
//             res.send(data);
//         }
//     });
// };

// // Update a review by ID
// const updateReview = (req, res) => {
//     const reviewId = req.params.id;

//     if (!req.body) {
//         res.status(400).send({ message: 'Content cannot be empty.' });
//     }

//     const updatedReview = new Review({
//         recipeId: req.body.recipeId,
//         userId: req.body.userId,
//         rating: req.body.rating,
//         comment: req.body.comment,
//     });

//     Review.updateById(reviewId, updatedReview, (err, data) => {
//         if (err) {
//             if (err.kind === 'not_found') {
//                 res.status(404).send({ message: `Review with id ${reviewId} not found.` });
//             } else {
//                 res.status(500).send({ message: `Error updating review with id ${reviewId}` });
//             }
//         } else {
//             res.send(data);
//         }
//     });
// };

// // Delete a review by ID
// const deleteReview = (req, res) => {
//     const reviewId = req.params.id;

//     Review.deleteById(reviewId, (err, data) => {
//         if (err) {
//             if (err.kind === 'not_found') {
//                 res.status(404).send({ message: `Review with id ${reviewId} not found.` });
//             } else {
//                 res.status(500).send({ message: `Error deleting review with id ${reviewId}` });
//             }
//         } else {
//             res.send({ message: `Review with id ${reviewId} was deleted successfully.` });
//         }
//     });
// };

// module.exports = { createReview, updateReview, deleteReview };

const Review = require('../models/review.model');

// Create a new review
const createReview = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: 'Content cannot be empty.' });
    }

    const newReview = new Review({
        recipeId: req.body.recipeId,
        userId: req.body.userId,
        rating: req.body.rating,
        comment: req.body.comment,
    });

    Review.create(newReview, (err, data) => {
        if (err) {
            res.status(500).send({ message: err.message || 'Some error occurred while creating the review.' });
        } else {
            res.send(data);
        }
    });
};

// Retrieve all reviews
const getAllReviews = (req, res) => {
    Review.getAll((err, data) => {
        if (err) {
            res.status(500).send({ message: err.message || 'Some error occurred while retrieving reviews.' });
        } else {
            res.send(data);
        }
    });
};

// Update a review by ID
const updateReview = (req, res) => {
    const reviewId = req.params.id;

    if (!req.body) {
        res.status(400).send({ message: 'Content cannot be empty.' });
    }

    const updatedReview = new Review({
        recipeId: req.body.recipeId,
        userId: req.body.userId,
        rating: req.body.rating,
        comment: req.body.comment,
    });

    Review.updateById(reviewId, updatedReview, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({ message: `Review with id ${reviewId} not found.` });
            } else {
                res.status(500).send({ message: `Error updating review with id ${reviewId}` });
            }
        } else {
            res.send(data);
        }
    });
};

// Delete a review by ID
const deleteReview = (req, res) => {
    const reviewId = req.params.id;

    Review.deleteById(reviewId, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({ message: `Review with id ${reviewId} not found.` });
            } else {
                res.status(500).send({ message: `Error deleting review with id ${reviewId}` });
            }
        } else {
            res.send({ message: `Review with id ${reviewId} was deleted successfully.` });
        }
    });
};

module.exports = { createReview, getAllReviews, updateReview, deleteReview };
