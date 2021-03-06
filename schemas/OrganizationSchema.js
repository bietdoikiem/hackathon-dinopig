const mongoose = require('mongoose');
const {Schema} = mongoose;

const OrganizationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    contact_phone: {
        type: String
    },
    address: {
        type: String
    }
})

module.exports = mongoose.model('organizations', OrganizationSchema);