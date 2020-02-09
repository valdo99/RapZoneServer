const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Song = new Schema({
    nome: {
        type: String
    },
    country: {
        type: String
    },
    youtube: {
        type: String
    },
    likes: {
        type: Number
    }
});
module.exports = mongoose.model('Song', Song);