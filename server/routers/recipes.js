var express = require('express');
var router = express.Router();
var recipes = require('../mockups/recipes.json');

router.get('/', function(req, res){
    res.json(recipes);
});

router.get('/:id([0-9]{3,})', function(req, res){
    var currRecipe = recipes.filter(function(recipe){
        if(recipe.id == req.params.id){
            return true;
        }
    });
    if(currRecipe.length == 1){
        res.json(currRecipe[0])
    } else {
        res.status(404);//Set status to 404 as recipe was not found
        res.json({message: "Not Found"});
    }
});

router.post('/', function(req, res){
    //Check if all fields are provided and are valid:
    // if(!req.body.name ||
    //     !req.body.year.toString().match(/^[0-9]{4}$/g) ||
    //     !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g)){
    //
    //     res.status(400);
    //     res.json({message: "Bad Request"});
    // } else {
        var newId = recipes[recipes.length-1].id+1;
        var oRecipe = {
            id: newId,
            name: req.body.name
        };

        recipes.push(oRecipe);
        res.json({oRecipe});
    // }
});

router.put('/:id', function(req, res){
    //Check if all fields are provided and are valid:
    if(!req.body.name ||
        !req.body.year.toString().match(/^[0-9]{4}$/g) ||
        !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g) ||
        !req.params.id.toString().match(/^[0-9]{3,}$/g)){

        res.status(400);
        res.json({message: "Bad Request"});
    } else {
        //Gets us the index of recipe with given id.
        var updateIndex = recipes.map(function(recipe){
            return recipe.id;
        }).indexOf(parseInt(req.params.id));

        if(updateIndex === -1){
            //recipe not found, create new
            recipes.push({
                id: req.params.id,
                name: req.body.name,
                year: req.body.year,
                rating: req.body.rating
            });
            res.json({message: "New recipe created.", location: "/recipes/" + req.params.id});
        } else {
            //Update existing recipe
            ingredients[updateIndex] = {
                id: req.params.id,
                name: req.body.name,
                year: req.body.year,
                rating: req.body.rating
            };
            res.json({message: "recipe id " + req.params.id + " updated.",
                location: "/recipes/" + req.params.id});
        }
    }
});

router.delete('/:id', function(req, res){
    var removeIndex = recipes.map(function(recipe){
        return recipe.id;
    }).indexOf(req.params.id); //Gets us the index of recipe with given id.

    if(removeIndex === -1){
        res.json({message: "Not found"});
    } else {
        recipes.splice(removeIndex, 1);
        res.send({message: "recipe id " + req.params.id + " removed."});
    }
});

module.exports = router;