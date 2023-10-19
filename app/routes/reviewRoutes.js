
// module.exports = (app) => {
//     const review_controller = require('../controller/reviewController');
//     var router = require('express').Router();
//     // Create a new review
//     router.post('/', review_controller.createReview);
//     // Update a review by ID
//     router.put('/:id', review_controller.updateReview);
//     // Delete a review by ID
//     router.delete('/:id', review_controller.deleteReview);
//     app.use('/api/reviews', router);
// };

module.exports = (app) => {
    const review_controller = require('../controller/reviewController');
    var router = require('express').Router();
    
    // Create a new review
    router.post('/', review_controller.createReview);
    
    // Retrieve all reviews
    router.get('/', review_controller.getAllReviews);
    
    // Update a review by ID
    router.put('/:id', review_controller.updateReview);
    
    // Delete a review by ID
    router.delete('/:id', review_controller.deleteReview);

    app.use('/api/reviews', router);
};
