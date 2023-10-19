// const sql = require('./db');

// const Review = function(review){
//     this.recipeId = reviewData.recipeId;
//     this.userId = reviewData.userId;
//     this.rating = reviewData.rating;
//     this.comment = reviewData.comment;
// }

// Review.create = (newReview, result) =>{
//     sql.query('INSERT INTO reviews SET ?', newReview, (err, res)=>{
//         if(err){
//             console.log("Error:", err);
//             result(err, null);
//             return;
//         }
//         result(null, {id: res.insertId, ...newReview});
//     });
// };

// Review.updateById = (id, data, result)=>{
//     sql.query('UPDATE reviews SET recipeId=?, userId=?, rating=?, comment=? WHERE id=?',[data.recipeId, data.userId, data.rating, data.comment , id], (err, res)=>{
//         if(err){
//             console.log('Error:'+err);
//             result(err,null);
//             return;
//         }
//         if(res.affectedRows ==0){
//             result({kind: "not_found"},null);
//         }
//         console.log('Update review:'+{id: id, ...data});
//         result(null,{id: id, ...data})
//         return;
//     });
// };

// Review.deleteById = (id, result)=>{
//     sql.query('DELETE FROM reviews WHERE id=?',[id] ,(err, res)=>{
//         if(err){
//             console.log('Error: '+err);
//             result(err,null);
//             return;
//         }
//         if(res.affectedRows ==0){
//             result({kind: 'not_found'}, null);
//             return;
//         }
//         console.log('Delete reviews id:'+id);
//         result(null, {id: id});
//     });
// };

// module.exports = Review;
//////////////////////////////////////////////////////////////////////////////////

// const sql = require('./db');

// const Review = function(review) {
//     this.recipeId = review.recipeId;
//     this.userId = review.userId;
//     this.rating = review.rating;
//     this.comment = review.comment;
// }

// // Create a new review
// Review.create = (newReview, result) => {
//     sql.query('INSERT INTO reviews SET ?', newReview, (err, res) => {
//         if (err) {
//             console.log('Error:', err);
//             result(err, null);
//             return;
//         }
//         result(null, { id: res.insertId, ...newReview });
//     });
// };

// // Update a review by ID
// Review.updateById = (id, data, result) => {
//     sql.query('UPDATE reviews SET recipeId=?, userId=?, rating=?, comment=? WHERE id=?', [data.recipeId, data.userId, data.rating, data.comment, id], (err, res) => {
//         if (err) {
//             console.log('Error:' + err);
//             result(err, null);
//             return;
//         }
//         if (res.affectedRows === 0) {
//             result({ kind: 'not_found' }, null);
//             return;
//         }
//         console.log('Updated review: ' + { id: id, ...data });
//         result(null, { id: id, ...data });
//     });
// };

// // Delete a review by ID
// Review.deleteById = (id, result) => {
//     sql.query('DELETE FROM reviews WHERE id=?', [id], (err, res) => {
//         if (err) {
//             console.log('Error: ' + err);
//             result(err, null);
//             return;
//         }
//         if (res.affectedRows === 0) {
//             result({ kind: 'not_found' }, null);
//             return;
//         }
//         console.log('Deleted review id: ' + id);
//         result(null, { id: id });
//     });
// };

// module.exports = Review;

const sql = require('./db');

const Review = function(review) {
    this.recipeId = review.recipeId;
    this.userId = review.userId;
    this.rating = review.rating;
    this.comment = review.comment;
}

// Create a new review
Review.create = (newReview, result) => {
    sql.query('INSERT INTO reviews SET ?', newReview, (err, res) => {
        if (err) {
            console.log('Error:', err);
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newReview });
    });
};

// Retrieve all reviews
Review.getAll = (result) => {
    sql.query('SELECT * FROM reviews', (err, res) => {
        if (err) {
            console.log('Error:', err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

// Update a review by ID
Review.updateById = (id, data, result) => {
    sql.query('UPDATE reviews SET recipeId=?, userId=?, rating=?, comment=? WHERE id=?', [data.recipeId, data.userId, data.rating, data.comment, id], (err, res) => {
        if (err) {
            console.log('Error:', err);
            result(err, null);
            return;
        }
        if (res.affectedRows === 0) {
            result({ kind: 'not_found' }, null);
            return;
        }
        console.log('Updated review: ' + { id: id, ...data });
        result(null, { id: id, ...data });
    });
};

// Delete a review by ID
Review.deleteById = (id, result) => {
    sql.query('DELETE FROM reviews WHERE id=?', [id], (err, res) => {
        if (err) {
            console.log('Error:', err);
            result(err, null);
            return;
        }
        if (res.affectedRows === 0) {
            result({ kind: 'not_found' }, null);
            return;
        }
        console.log('Deleted review id: ' + id);
        result(null, { id: id });
    });
};

module.exports = Review;
