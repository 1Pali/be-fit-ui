var express = require('express');
var router = express.Router();
var recipeDescriptions = require('../mockups/recipeDescriptions.json');

router.get('/', function(req, res){
    res.json(recipeDescriptions);
});

router.get('/:id([0-9]{3,})', function(req, res){
    var currRecipeDescription = recipeDescriptions.filter(function(recipeDescription){
        if(recipeDescription.id == req.params.id){
            return true;
        }
    });
    if(currRecipeDescription.length == 1){
        res.json(currRecipeDescription[0])
    } else {
        res.status(404);//Set status to 404 as recipeDescription was not found
        res.json({message: "Not Found"});
    }
});

router.post('/', function(req, res){
    //Check if all fields are provided and are valid:
    if(!req.body.name ||
        !req.body.year.toString().match(/^[0-9]{4}$/g) ||
        !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g)){

        res.status(400);
        res.json({message: "Bad Request"});
    } else {
        var newId = recipeDescriptions[recipeDescriptions.length-1].id+1;
        recipeDescriptions.push({
            id: newId,
            name: req.body.name,
            year: req.body.year,
            rating: req.body.rating
        });
        res.json({message: "New Recipe Description created.", location: "/recipeDescriptions/" + newId});
    }
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
        //Gets us the index of recipeDescription with given id.
        var updateIndex = recipeDescriptions.map(function(recipeDescription){
            return recipeDescription.id;
        }).indexOf(parseInt(req.params.id));

        if(updateIndex === -1){
            //recipeDescription not found, create new
            recipeDescriptions.push({
                id: req.params.id,
                name: req.body.name,
                year: req.body.year,
                rating: req.body.rating
            });
            res.json({message: "New recipe Description created.", location: "/recipeDescriptions/" + req.params.id});
        } else {
            //Update existing recipeDescription
            recipeDescriptions[updateIndex] = {
                id: req.params.id,
                name: req.body.name,
                year: req.body.year,
                rating: req.body.rating
            };
            res.json({message: "Recipe Description id " + req.params.id + " updated.",
                location: "/recipeDescriptions/" + req.params.id});
        }
    }
});

router.delete('/:id', function(req, res){
    var removeIndex = recipeDescriptions.map(function(recipeDescription){
        return recipeDescription.id;
    }).indexOf(req.params.id); //Gets us the index of recipeDescription with given id.

    if(removeIndex === -1){
        res.json({message: "Not found"});
    } else {
        recipeDescriptions.splice(removeIndex, 1);
        res.send({message: "Recipe Description id " + req.params.id + " removed."});
    }
});

module.exports = router;