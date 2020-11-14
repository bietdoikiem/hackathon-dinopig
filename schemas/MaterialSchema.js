const mongoose = require('mongoose');
const {Schema} = mongoose;


const MaterialSchema = new Schema({
    information: {
        type: String
    }
})

module.exports = mongoose.model('materials', MaterialSchema);