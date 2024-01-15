import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    title: {
        type: String,
        required: true,
    },

    body: {
        type: String,
        required: true,
    },

    tags: [
        {
            type: String,
            required: true,
        }
    ],

    upVotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }],

    downVotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }],

    postedOn: {
        type: Date,
        default: Date.now(),
    },

}, { timestamps: true });

const Question = mongoose.model('question', QuestionSchema);
export default Question;