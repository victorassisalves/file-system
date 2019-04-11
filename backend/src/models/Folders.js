const mongoose = require('mongoose');

const Folders = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    files: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "File" // ref => nome do model de file
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('Folders', Folders);