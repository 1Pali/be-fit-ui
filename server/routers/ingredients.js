var express = require('express');
var router = express.Router();
var ingredients = require('../mockups/ingredients.json');

router.get('/', function(req, res){
    res.json(ingredients);
});

router.get('/:id([0-9]{3,})', function(req, res){
    var currIngredient = ingredients.filter(function(ingredient){
        if(ingredient.id == req.params.id){
            return true;
        }
    });
    if(currIngredient.length == 1){
        res.json(currIngredient[0])
    } else {
        res.status(404);//Set status to 404 as ingredient was not found
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
        var newId = ingredients[ingredients.length-1].id+1;

        var oIngredient = {
            id: newId,
            name: req.body.name,
            description: req.body.description,
            energy: req.body.energy,
            protein: req.body.protein,
            carbohydrate: req.body.carbohydrate,
            fat: req.body.fat,
            fiber: req.body.fiber,
            price: req.body.price
        };

        ingredients.push(oIngredient);
        res.json({oIngredient});
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
        //Gets us the index of ingredient with given id.
        var updateIndex = ingredients.map(function(ingredient){
            return ingredient.id;
        }).indexOf(parseInt(req.params.id));

        if(updateIndex === -1){
            //Ingredient not found, create new
            ingredients.push({
                id: req.params.id,
                name: req.body.name,
                year: req.body.year,
                rating: req.body.rating
            });
            res.json({message: "New ingredients created.", location: "/ingredients/" + req.params.id});
        } else {
            //Update existing ingredient
            ingredients[updateIndex] = {
                id: req.params.id,
                name: req.body.name,
                year: req.body.year,
                rating: req.body.rating
            };
            res.json({message: "ingredient id " + req.params.id + " updated.",
                location: "/ingredients/" + req.params.id});
        }
    }
});

router.delete('/:id', function(req, res){
    var removeIndex = ingredients.map(function(ingredient){
        return ingredient.id;
    }).indexOf(req.params.id); //Gets us the index of ingredient with given id.

    if(removeIndex === -1){
        res.json({message: "Not found"});
    } else {
        ingredients.splice(removeIndex, 1);
        res.send({message: "ingredient id " + req.params.id + " removed."});
    }
});

module.exports = router;