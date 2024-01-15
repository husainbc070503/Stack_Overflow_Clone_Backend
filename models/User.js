import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcryptjs from 'bcryptjs';
import dotenv from "dotenv";
dotenv.config();

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    profile: {
        type: String,
        default: "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=740&t=st=1702733188~exp=1702733788~hmac=9ca3982e7346bee3329f5f1be5d78a85fb6034a76cedd4e78f5c040d7b346cf1"
    },

    about: String,
    tags: [{ type: String }],

    joinedOn: {
        type: Date,
        default: Date.now(),
    }

}, { timestamps: true });

UserSchema.pre('save', async function (next) {
    try {
        const user = this;
        if (!user.isModified('password'))
            return next();

        const salt = await bcryptjs.genSalt(10);
        const secPassword = await bcryptjs.hash(user.password, salt);
        user.password = secPassword;
    } catch (error) {
        next();
    }
});

UserSchema.methods.validatePassword = async function (password) {
    try {
        const res = await bcryptjs.compare(password, this.password);
        return res;
    } catch (error) {
        console.log(error.message);
    }
}

UserSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({ userId: this._id.toString() }, process.env.JWT_SECRET, { expiresIn: '10d' })
    } catch (error) {
        console.log(error.message);
    }
}

const User = mongoose.model('user', UserSchema);
export default User;