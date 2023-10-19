

const authJwt = require('../middleware/auth.jwt')
module.exports = (app) => {
    const recipe_controller = require('../controller/recipeContorller');
    var router = require('express').Router();
    // Create a new recipe
    router.post('/', recipe_controller.createRecipe);
    // Get a single recipe by ID
    router.get('/:id', recipe_controller.getRecipeById);
    // Get all recipes
    router.get('/', recipe_controller.getAllRecipes);
    // Update a recipe by ID
    router.put('/:id', recipe_controller.updateRecipe);
    // Delete a recipe by ID
    router.delete('/:id', recipe_controller.deleteRecipe);
    app.use('/api/recipes', router);

};
