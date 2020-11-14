const mongoose = require('mongoose');
const {Schema} = mongoose;


const QuizSchema = new Schema({
    username: {
        type: String,
       
    },
    sampleId : {
        type: String,
        
    },
    userChoice: {
        type: String,
        default: null
    },
    result: {
        type: Boolean,
    }
})

module.exports = mongoose.model('quizzes', QuizSchema);