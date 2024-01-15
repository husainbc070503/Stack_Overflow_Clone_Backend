import { Router } from "express";
import ValidUser from "../middleware/ValidUser.js";
import Answer from "../models/Answer.js";
import ValidateInput from "../middleware/ValidateInput.js";
import PostAsnwer from "../validators/AnswerValidator.js";
const router = Router();

router.post('/postAnswer', ValidateInput(PostAsnwer), ValidUser, async (req, res) => {
    try {
        var ans = await Answer.create({ ...req.body, user: req.user._id });
        ans = await Answer.findById(ans._id)
            .populate('user')
            .populate('question');

        res.status(200).json({ success: true, ans });

    } catch (error) {
        res.status(200).json({ success: false, message: error.message });
    }
});

router.get('/answers', ValidUser, async (req, res) => {
    try {
        const answers = await Answer.find()
            .populate('user')
            .populate('question')
            .sort({ answeredOn: -1 });

        res.status(200).json({ success: true, answers });

    } catch (error) {
        res.status(200).json({ success: false, message: error.message });
    }
});

router.delete('/deleteAnswer/:id', ValidUser, async (req, res) => {
    try {
        await Answer.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(200).json({ success: false, message: error.message });
    }
});

router.put('/voteAnswer/:id', ValidUser, async (req, res) => {
    try {
        const id = req.params.id;
        const { value } = req.body;
        const answer = await Answer.findById(id);

        const upIndex = answer.upVotes.findIndex((item) => item.toString() === req.user._id.toString());
        const downIndex = answer.downVotes.findIndex((item) => item.toString() === req.user._id.toString());

        if (value === "upvote") {
            if (downIndex !== -1)                                                                                   // if present in downvotes then remove from downvotes
                answer.downVotes = answer.downVotes.filter((item) => item.toString() !== req.user._id.toString())

            if (upIndex === -1)                                                                                // if not voted then add
                answer.upVotes.push(req.user._id);
            else                                                                                                    // if voted then remove becoz one can only vote a answer once
                answer.upVotes = answer.upVotes.filter((item) => item.toString() !== req.user._id.toString())
        } else if (value === "downvote") {
            if (upIndex !== -1)                                                                                       // if present in upvoted then remove from upvoted
                answer.upVotes = answer.upVotes.filter((item) => item.toString() !== req.user._id.toString())

            if (downIndex === -1)                                                                                // if not voted then add
                answer.downVotes.push(req.user._id);
            else                                                                                                      // if voted then remove becoz one can only vote a answer once
                answer.downVotes = answer.downVotes.filter((item) => item.toString() !== req.user._id.toString())
        }

        const updatedAnswer = await Answer.findByIdAndUpdate(id, answer, { new: true })
            .populate('user')
            .populate('question');

        res.status(200).json({ success: true, updatedAnswer });

    } catch (error) {
        res.status(200).json({ success: false, message: error.message });
    }
});

export default router;