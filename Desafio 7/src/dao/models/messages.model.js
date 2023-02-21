import { Schema, model } from 'mongoose';


const messagesSchema = new Schema(
    {
        user: String,
        message: String
    },
    { versionKey: false }
);


module.exports = model('messages', messagesSchema);