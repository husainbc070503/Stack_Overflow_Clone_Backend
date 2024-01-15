import { Router } from "express";
import ValidUser from "../middleware/ValidUser.js";
import Question from "../models/Question.js";
import ValidateInput from "../middleware/ValidateInput.js";
import PostQuestion from "../validators/QuestionValidator.js";
const router = Router();

router.post('/postQuestion', ValidateInput(PostQuestion), ValidUser, async (req, res) => {
    try {
        if (req.body.tags.length === 0)
            return res.status(200).json({ success: false, message: 'Tags must not be empty. Add atleast one!' })

        var question = await Question.create({ ...req.body, user: req.user._id });
        question = await Question.findById(question._id).populate('user');

        res.status(200).json({ success: true, question });

    } catch (error) {
        res.status(200).json({ success: false, message: error.message });
    }
});

router.get('/questions', ValidUser, async (req, res) => {
    try {
        const questions = await Question.find()
            .populate('user')
            .sort({ postedOn: -1 });

        res.status(200).json({ success: true, questions });

    } catch (error) {
        res.status(200).json({ success: false, message: error.message });
    }
});

router.put('/voteQuestion/:id', ValidUser, async (req, res) => {
    try {
        const id = req.params.id;
        const { value } = req.body;
        const question = await Question.findById(id);

        const upIndex = question.upVotes.findIndex((item) => item.toString() === req.user._id.toString());
        const downIndex = question.downVotes.findIndex((item) => item.toString() === req.user._id.toString());

        if (value === "upvote") {
            if (downIndex !== -1)                                                                                   // if present in downvotes then remove from downvotes
                question.downVotes = question.downVotes.filter((item) => item.toString() !== req.user._id.toString())

            if (upIndex === -1)                                                                                // if not voted then add
                question.upVotes.push(req.user._id);
            else                                                                                                    // if voted then remove becoz one can only vote a question once
                question.upVotes = question.upVotes.filter((item) => item.toString() !== req.user._id.toString())
        } else if (value === "downvote") {
            if (upIndex !== -1)                                                                                       // if present in upvoted then remove from upvoted
                question.upVotes = question.upVotes.filter((item) => item.toString() !== req.user._id.toString())

            if (downIndex === -1)                                                                                // if not voted then add
                question.downVotes.push(req.user._id);
            else                                                                                                      // if voted then remove becoz one can only vote a question once
                question.downVotes = question.downVotes.filter((item) => item.toString() !== req.user._id.toString())
        }

        const updatedQuestion = await Question.findByIdAndUpdate(id, question, { new: true })
            .populate('user');

        res.status(200).json({ success: true, updatedQuestion });

    } catch (error) {
        res.status(200).json({ success: false, message: error.message });
    }
});

router.delete('/deleteQuestion/:id', ValidUser, async (req, res) => {
    try {
        await Question.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(200).json({ success: false, message: error.message });
    }
});

export default router;