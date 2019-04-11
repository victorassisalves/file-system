const mongoose = require('mongoose');

const Folders = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    files: [{type: mongoose.Schema.Types.ObjectId, ref: "files"}]
}, {
    timestamps: true
});

module.exports = mongoose.model('Folders', Folders);