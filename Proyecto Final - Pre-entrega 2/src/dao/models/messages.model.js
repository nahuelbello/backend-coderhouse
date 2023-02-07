import { Schema, model } from "mongoose";


const messagesCollection = "messages";

const messagesSchema = new Schema(
    {
        user: String,
        message: String
    },
    { versionKey: false }
);

const messagesModel = model(messagesCollection, messagesSchema);


export default messagesModel;