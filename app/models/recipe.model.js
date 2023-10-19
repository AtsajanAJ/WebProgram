const sql = require('./db');

const Recipe = function(recipe){
    this.title = recipe.title;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
    this.category = recipe.category;
}

Recipe.create = (newRecipe, result)=>{
    sql.query('INSERT INTO recipes SET ?', newRecipe, (err, res)=>{
        if(err){
            console.log('error', err);
            result(err, null);
            return;
        }
        result(null, {id: res.insertId,...newRecipe});
    });
};

Recipe.findById = (recipeId, result)=>{
    sql.query(`SELECT * FROM recipes WHERE id = ${recipeId}`, (err, res)=>{
        if(err){
            console.log('Error',err);
            result(err,null);
            return;
        }
        if(res.length){
            result(null, res[0]);
            return;
        }
        result({ kind: 'not_found'}, null);
    });
};

Recipe.getAll = result =>{
    sql.query('SELECT * FROM recipes', (err, res)=>{
        if(err){
            console.log('Error: ', err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

Recipe.deleteById = (id, result) => {
    sql.query('DELETE FROM recipes WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log('Error: ' + err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: 'not_found' }, null);
            return;
        }
        console.log('Deleted recipe with id: ' + id);
        result(null, res);
    });
};

Recipe.updateById = (id, updatedRecipe, result) => {
    sql.query(
        'UPDATE recipes SET title = ?, ingredients = ?, instructions = ?, category = ? WHERE id = ?',
        [updatedRecipe.title, updatedRecipe.ingredients, updatedRecipe.instructions, updatedRecipe.category, id],
        (err, res) => {
            if (err) {
                console.log('Error: ' + err);
                result(err, null);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: 'not_found' }, null);
                return;
            }
            console.log('Updated recipe with id: ' + id);
            result(null, { id: id, ...updatedRecipe });
        }
    );
};

module.exports = Recipe;