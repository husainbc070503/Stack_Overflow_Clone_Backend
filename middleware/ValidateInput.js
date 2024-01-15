const ValidateInput = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (error) {
        // res.status(400).json({ success: false, message: error.message });
        const err = {
            status: 400,
            message: error.issues[0].message
        }
        next(err);
    }
}

export default ValidateInput;