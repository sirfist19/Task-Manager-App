const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});
function validate(email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled');
    }
    if (!validator.isEmail(email)) {
        throw Error('Not a valid email.');
    }
    if(!validator.isStrongPassword(password)) {
        throw Error('The password is not strong enough');
    }
    return true;
}
userSchema.statics.register = async function (email, password) {
    validate(email, password); // returns error if not valid

    const exists = await this.findOne({email});
    if (exists) {
        throw Error("Email already exists");
    }

    // hashing the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({
        email,
        password: hash
    });
    return user;
};
userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled');
    }
    // check if the email is valid
    if(!validator.isEmail(email)) {
        throw Error('Not a valid email.');
    }
    // find the user based on their email
    const user = await this.findOne({email});
    if (!user) {
        throw Error('That user does not exist');
    }
    // then see if there password matches
    const correctPassword = await bcrypt.compare(password, user.password); // need the encrypted password
    if (!correctPassword) {
        throw Error('Incorrect email or password');
    } 
    return user;
}

module.exports = mongoose.model('user', userSchema);