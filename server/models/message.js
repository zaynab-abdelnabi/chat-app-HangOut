const mongoose = require('mongoose');

const ModelSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reciever: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    seen:{
        type: Boolean,
        default:false,
    },
    date:{
        type: Date,
        default: Date.now,
    }
});

const Model = mongoose.model('Message', ModelSchema);

module.exports = Model;