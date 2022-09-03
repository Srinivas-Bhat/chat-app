const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {type: String, required: true, min: 3, max: 20, unique: true},
    email: {type: String, required: true, unique: true, max: 50},
    password: {type: String, required: true, min: 6}, 
    isAvatarImageSet: {
        type: Boolean,
        default: false,
    }, 
    avatarImage: {
        type: String,
        default: "",
    },
});

const UserModel = mongoose.model("chatUsers", userSchema);

module.exports  = UserModel;