import { Router } from "express";
import messageModel from "../dao/models/message.model.js";


const chatRouter = Router();


chatRouter.get("/", async (req, res) => {
    try {
        const messages = await messageModel.find().lean();
        res.render("chat", { messages: messages });
    } catch (err) {
        res.status(404).send(err);
    }
});


export default chatRouter;
