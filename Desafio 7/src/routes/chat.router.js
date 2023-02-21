import { Router } from 'express';
import messagesModel from '../dao/models/messages.model.js';


const chatRouter = Router();


chatRouter.get('/', async (req, res) => {
    try {
        const messages = await messagesModel.find().lean();
        res.render('chat', { messages: messages });
    } catch (err) {
        res.status(404).send(err);
    }
});


export default chatRouter;
