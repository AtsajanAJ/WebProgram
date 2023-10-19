// const Recipe = require('../models/recipe.model');
// const Review = require('../models/review.model');

// //Create a new recipe
// exports.createRecipe = async (req, res) => {
//     try{
//         const recipeData = req.body;
//         const recipe = new Recipe(recipeData);
//         const newRecipe = await recipe.save();
//         res.status(201).json(newRecipe);
//     } catch (error){
//         console.log(error);
//         res.status(500).json({ message: 'Error creating recipe'});
//     }
// };

// //Update an existing recipe by ID
// exports.updateRecipe = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const updatedData = req.body;
//         await Recipe.updateById(id, updatedData);
//         res.status(200).json({ message: 'Recipe updated successfully'});
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error updating recipe'});
//     }
// };

// //Delete a recipe by ID
// exports.deleteRecipe = async (req, res) => {
//     try {
//         const { id } = req.params;
//         await Recipe.deleteById(id);
//         res.status(200).json({ message: 'Recipe deleted successfully'});
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error deleting recipe'});
//     }
// };

// //Get all recipes
// exports.getAllRecipes = async (req, res) => {
//     try {
//         const recipes = await Recipe.getAllRecipes();
//         res.json(recipes);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error retrieving recipes'});
//     }
// };

// // Add a new review to a recipe
// exports.addReview = async (req, res) => {
//     try {
//         const { recipeId } = req.params;
//         const reviewData = req.body;
//         const review = new Review(reviewData);
//         // Associate the review with the recipe by setting the recipe_id
//         review.recipeId = recipeId   /// not sure *******************************
//         const newReview = await review.save();
//         res.status(201).json(newReview);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error adding a review'});
//     }
// };
const Recipe = require('../models/recipe.model');

// Create a new recipe
const createRecipe = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: 'Content cannot be empty.' });
    }

    const newRecipe = new Recipe({
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        category: req.body.category,
    });

    Recipe.create(newRecipe, (err, data) => {
        if (err) {
            res.status(500).send({ message: err.message || 'Some error occurred while creating the recipe.' });
        } else {
            res.send(data)
        }
    });
};

// Get a single recipe by ID
const getRecipeById = (req, res) => {
    const recipeId = req.params.id;

    Recipe.findById(recipeId, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({ message: `Recipe with id ${recipeId} not found.` });
            } else {
                res.status(500).send({ message: `Error retrieving recipe with id ${recipeId}` });
            }
        } else {
            res.send(data);
        }
    });
};

// Get all recipes
const getAllRecipes = (req, res) => {
    Recipe.getAll((err, data) => {
        if (err) {
            res.status(500).send({ message: err.message || 'Some error occurred while retrieving recipes.' });
        } else {
            res.send(data);
        }
    });
};

// Update a recipe by ID
const updateRecipe = (req, res) => {
    const recipeId = req.params.id;

    if (!req.body) {
        res.status(400).send({ message: 'Content cannot be empty.' });
    }

    const updatedRecipe = new Recipe({
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        category: req.body.category,
    });

    Recipe.updateById(recipeId, updatedRecipe, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({ message: `Recipe with id ${recipeId} not found.` });
            } else {
                res.status(500).send({ message: `Error updating recipe with id ${recipeId}` });
            }
        } else {
            res.send(data);
        }
    });
};

// Delete a recipe by ID
const deleteRecipe = (req, res) => {
    const recipeId = req.params.id;

    Recipe.deleteById(recipeId, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({ message: `Recipe with id ${recipeId} not found.` });
            } else {
                res.status(500).send({ message: `Error deleting recipe with id ${recipeId}` });
            }
        } else {
            res.send({ message: `Recipe with id ${recipeId} was deleted successfully.` });
        }
    });
};


module.exports = { createRecipe, getRecipeById, getAllRecipes, updateRecipe, deleteRecipe };