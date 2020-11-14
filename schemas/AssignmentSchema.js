const mongoose = require('mongoose');
const {Schema} = mongoose;


const AssignmentSchema = new Schema({
    sampleId: {
        type: String,
    },
    username: {
        type: String,
    },
    quizIds: {
        type: [String],
    },
    result: {
        type: Number
    }
})

module.exports = mongoose.model('assignments', AssignmentSchema);