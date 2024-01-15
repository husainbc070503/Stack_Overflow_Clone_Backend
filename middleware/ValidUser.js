import jwt from 'jsonwebtoken';
import User from '../models/User.js';
const JWT_SECRET = process.env.JWT_SECRET;

const ValidUser = async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const data = jwt.verify(token, JWT_SECRET);
            req.user = await User.findById(data.userId).select("-password");
            next();

        } catch (error) {
            res.status(400).json({ success: false, message: error.message })
        }
    } else {
        res.status(400).json({ success: false, message: 'Unauthenticated user' })
    }
}

export default ValidUser;