const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    age:{
        type: Number,
        required: true
    },
    image:{
    
    },
    height:{
        type: String,
        required: true,
    },
    weight:{
        type: String,
        required: true,
    },
    location:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

var Profiles = mongoose.model('Profile', profileSchema);

module.exports = Profiles;