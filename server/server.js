var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

app.set('port', (process.env.PORT || 8000));
app.use(express.static(path.join(__dirname, '../main/webapp')));

var ingredients = require('./routers/ingredients.js');
app.use('/ingredients', ingredients);

var recipes = require('./routers/recipes.js');
app.use('/recipes', recipes);

var recipeDescriptions = require('./routers/recipeDescriptions.js');
app.use('/recipeDescriptions', recipeDescriptions);

//For avoiding Heroku $PORT error
app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});

