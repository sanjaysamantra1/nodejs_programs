const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
})

userSchema.pre('save', async function (next) {
    const user = this;
    user.password = btoa(user.password)
    next();
});

let userModel = mongoose.model("User", userSchema);
module.exports = userModel;