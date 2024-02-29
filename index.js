// Set Express
var express = require('express');
var app = express();

// Set Up Handlebars View Engine
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Set port
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

// Routing
app.get('/', function(req, res) {
    res.render('home');
});

// Port in Console
app.listen(app.get('port'), () => {
    console.log('Iniciado en http://localhost:' + app.get('port'));
});