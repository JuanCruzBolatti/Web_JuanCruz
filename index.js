// Set Express
const express = require('express');
const app = express();

// Set path
const fs = require('fs');
const path = require('path');

// Set Up Handlebars View Engine
app.set('views', path.join(__dirname, 'views'));
const handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Set port
app.set('port', process.env.PORT || 8080);
app.use(express.static(__dirname + '/public'));

// Language
function loadLanguage(lang) {
    const filePath = path.join(__dirname, './public/js/languages', `${lang}.json`);
    try {
        const data = fs.readFileSync(filePath);
        return JSON.parse(data);
    } catch (err) {
        console.error(`Error al utilizar el idioma ${lang}:`, err);
        return {};
    }
}

// Routing
app.get('/sitemap.xml', (req, res) => {
    res.sendFile(path.join(__dirname, './sitemap.xml'));
});

app.get('/brand', function (req, res) {
    const lang = req.query.lang || 'es';
    const language = loadLanguage(lang);

    res.render('brand', { layout: 'others', language, topTitle: 'Marca' });
});

app.get('/brands/nama', function (req, res) {
    const lang = req.query.lang || 'es';
    const language = loadLanguage(lang);

    res.render('brands/nama', { layout: 'others', language, topTitle: 'Marca Nama' });
});

app.get('/projects', function (req, res) {
    res.render('projects', { layout: 'others', topTitle: 'Proyectos' });
});

app.get('/', function (req, res) {
    const lang = req.query.lang || 'es';
    const language = loadLanguage(lang);

    res.render('index', { language });
});

// Port in Console
app.listen(app.get('port'), () => {
    console.log('Iniciado en http://localhost:' + app.get('port'));
});