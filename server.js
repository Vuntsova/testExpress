/**
 * Created by webohweb on 5/7/17.
 */
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');


var app = express();

var PORT = process.env.PORT || 8080;

app.use(express.static("./app/public"));

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }));

// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }));



// Data
// ===================
var characters = [
    {
        routeName:"yoda",
        name:"Yoda",
        role: "Jedi Master",
        age: 900,
        forcePoints: 2000
    },
    {
        routeName:"darthmaul",
        name: "Darth Maul",
        role: "Sith Lord",
        age: 200,
        forcePoints: 1200
    },
    {
        routeName:"obiwankenobi",
        name: "Obi Wan Kenobi",
        role: "Jedi Knight",
        age: 60,
        forcePoints: 1350
    }
];

// Routes
// =================
app.get('/', function (req,res) {
    res.sendFile(path.join(__dirname, "/app/public/home.html"));
});

app.get('/add', function (req,res) {
    res.sendFile(path.join(__dirname, "/app/public/add.html"));
});

app.get('/all', function  (req, res){
    res.sendFile(path.join(__dirname, '/app/public/all.html'));
});

app.get('/api/:characters?', function (req,res) {
    var chosen = req.params.characters;


    if(chosen) {
        console.log(chosen);
        for (var i = 0; i < characters.length; i++) {
            if (chosen === characters[i].routeName) {
                res.json(characters[i]);
                console.log(chosen);
                return;
            }
        }
        res.send('No character found');
    }else {
        res.json(characters);
    }
});

app.post("/add/new", function (req, res) {
   var newCharacter = req.body;
   newCharacter.routeName = newCharacter.name.replace(/\s+/g,"").toLowerCase();

   characters.push(newCharacter);
   res.json(newCharacter);
});

app.listen(PORT, function () {
    console.log('Boom Shakalacka '+ PORT)
});