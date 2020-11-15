const mongoose = require('mongoose');
const {Schema} = mongoose;

const OrganizationSchema = require('../schemas/OrganizationSchema').schema;


const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
    },
    name: String,
    email: String,
    password: String,
    dob: Date,
    phone_number: String,
    role: {
        type: String,
        required: true,
        lowercase: true,
    },
    subjectIds: {
        type: [String]
    },
    organization: {
        type: OrganizationSchema,
    },
    avatar_url: {
        type: String,
        required: false,
        default: 'default.jpeg',
    },
    token: {
        type: String
    }
})

module.exports = mongoose.model('users', UserSchema);