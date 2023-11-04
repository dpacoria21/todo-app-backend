const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

UserSchema.methods.toJSON = function() {
    const {password, __v, _id, ...user} = this.toObject();
    user.uid = _id;
    return user;
};     

module.exports = model('User', UserSchema);