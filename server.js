const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const songRoutes = express.Router();
const PORT = 4000;
let Song = require('./songModel.js');
app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb://127.0.0.1:27017/Songs', {useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})
songRoutes.route('/').get(function(req, res) {
    Song.find(function(err, songs) {
        if (err) {
            console.log(err);
        } else {
            res.json(songs);
        }
    });
});
songRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Song.findById(id, function(err, song) {
        res.json(song);
    });
});
songRoutes.route('/update/:id').post(function(req, res) {
    Song.findById(req.params.id, function(err, song) {
        if (!song)
            res.status(404).send("data is not found");
        else
            song.nome = req.body.nome;
            song.country = req.body.country;
            song.youtube = req.body.youtube;
            song.likes = req.body.likes;
            song.save().then(song => {
                res.json('Song updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});
songRoutes.route('/add').post(function(req, res) {
    let song = new Song(req.body);
    song.save()
        .then(song => {
            res.status(200).json({'song': 'song added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new song failed');
        });
});
app.use('/Songs', songRoutes);
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});