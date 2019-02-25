const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: false
    },
    project: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'Project'   
    },
    user: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    }
});

module.exports = mongoose.model('Task', taskSchema);
