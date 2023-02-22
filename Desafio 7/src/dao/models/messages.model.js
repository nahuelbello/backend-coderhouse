import { Schema, model } from 'mongoose';


const messagesSchema = new Schema(
    {
        user: String,
        message: String
    },
    { versionKey: false }
);


export default model('messages', messagesSchema);