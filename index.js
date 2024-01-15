import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToMongoDB from "./database/Connection.js";
import ErrorHandler from "./middleware/ErrorHandler.js";
import Authentication from "./routes/User.js";
import Question from "./routes/Question.js";
import Answer from "./routes/Answer.js";

const app = express();
const port = process.env.PORT

connectToMongoDB();
dotenv.config();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));
app.use('/api/user', Authentication);
app.use('/api/question', Question);
app.use('/api/Answer', Answer);

app.use(ErrorHandler)
app.listen(port, () => console.log(`Server running on port ${port}`))