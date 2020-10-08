var express = require('express');
var app = express();
var path = require('path');
// var bodyParser = require('body-parser');




const { createProxyMiddleware } = require('http-proxy-middleware');

/**
 * Configure proxy middleware
 */


const jsonPlaceholderProxy = createProxyMiddleware({
    //LOCAL DEVELOPMENT ONLY otherwise switch to deployed app url
    // target: 'http://localhost:8080/',
    target: 'https://be-fit-be.herokuapp.com',
    changeOrigin: true, // for vhosted sites, changes host header to match to target's host
    logLevel: 'debug',
});
app.use('/api', jsonPlaceholderProxy);



//multer causing some issues at startup of app but without him data not working properly
// var multer = require('multer');
// var upload = multer();

//
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(upload.array());

app.set('port', (process.env.PORT || 8000));
app.use(express.static(path.join(__dirname, '../main/webapp')));



//NEEDED ONLY WHEN LOCAL MOCKUP SERVER IS USED
// var ingredients = require('./routers/ingredients.js');
// app.use('/ingredient', ingredients);
//
// var recipes = require('./routers/recipes.js');
// app.use('/recipe', recipes);
//
// var recipeDescriptions = require('./routers/recipeDescriptions.js');
// app.use('/recipeDescription', recipeDescriptions);

//For avoiding Heroku $PORT error
app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});

