const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema;

const User = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

User.pre('save', function (next) {
    const user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                console.log('hiba a salt generalasa soran');
                return next(error);
            }
            bcrypt.hash(user.password, salt, function (error, hash) {
                if (error) {
                    console.log('hiba a hasheles soran');
                    return next(error);
                }
                user.password = hash;
                return next();
            })
        })

    } else {
        return next();
    }
});

User.methods.comparePasswords = function (password, next) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        next(err, isMatch);
    });
};

module.exports = User