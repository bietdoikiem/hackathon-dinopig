const mongoose = require('mongoose');
const {Schema} = mongoose;


const SampleQuizSchema = new Schema({

    question: {
        type: String,
        required: true,
    },
    choices: {
        type: Array,
        required: true
    },
    correctAnswer: {
        type: String,
        required: true,
    },
    mark: {
        type: Number
    },
    topicIds: {
        type: [String],
    },
    subjectId: {
        type: String,
    },
    difficulty: {
        type: Number
    }
})

module.exports = mongoose.model('sampleQuizzes', SampleQuizSchema);