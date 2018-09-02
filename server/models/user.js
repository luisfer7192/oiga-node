const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// create the roles
let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} It is not a valid role'
};

let Schema = mongoose.Schema;

// Create the user Schema
let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

// Delete password from the data
userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

// valid the unique user
userSchema.plugin(uniqueValidator, { message: '{PATH} it must be unique' });

module.exports = mongoose.model('User', userSchema);
