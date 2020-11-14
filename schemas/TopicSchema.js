const mongoose = require('mongoose');
const {Schema} = mongoose;


const TopicSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    materialIds: {
        type: [String]
    }
})

module.exports = mongoose.model('topics', TopicSchema);