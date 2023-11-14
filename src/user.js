const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new Schema({
    firstName : {
        type : String,
        required: [true, "First Name is required"],
        minLength: [2, "First Name minimum length should be 2"],
        maxLength: [10, "First Name maximum length should be 10"],
    },
    lastName : {
        type : String,
        required: [true, "Last Name is required"],
        minLength: [2, "Last Name minimum length should be 2"],
        maxLength: [10, "Last Name maximum length should be 10"],
    },
    avatar: {
        type: String,
        default: "https://w7.pngwing.com/pngs/867/694/png-transparent-user-profile-default-computer-icons-network-video-recorder-avatar-cartoon-maker-blue-text-logo.png"
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "this email is not valid email type"] 
    },
    number: { 
        type: Number, 
        required: [true, "Number is required"]
    },
    password: {
        type: String, 
        required: [true, "Password is required"]
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    purchasedProducts: {
        type: Array,
        required: false
    },
    mfa:{
        type: Boolean,
        default: false
    },
    otp: Number,
    otpExpire: Date,

    resetPasswordToken: String,
    resetPasswordExpire : Date,

},{timestamps: true});

const User = mongoose.model('user', UserSchema)
module.exports = User
