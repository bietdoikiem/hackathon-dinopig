const mongoose = require('mongoose');
const {Schema} = mongoose;


const SampleAssignmentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    due_date: Date,
    mark: Number,
    time: Number,
    sampleQuizIds: {
        type: [String],
    },
})

module.exports = mongoose.model('sampleAssignments', SampleAssignmentSchema);