import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },

    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'question',
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },

    answeredOn: {
        type: Date,
        default: Date.now()
    },

    upVotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }],

    downVotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }],

}, { timestamps: true });

const Answer = mongoose.model('answer', AnswerSchema);
export default Answer;