const mongoose = require('mongoose');
const {Schema} = mongoose;



const SubjectSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    assignmentIds: {
        type: [String]
    },
    start_date: Date,
    end_date: Date,
})

module.exports = mongoose.model('subjects', SubjectSchema);