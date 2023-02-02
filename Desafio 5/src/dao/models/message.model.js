import { Schema, model } from "mongoose";


const useCollection = "messages";

const userSchema = new Schema(
    {
        user: String,
        message: String
    },
    { versionKey: false }
);

const messageModel = model(useCollection, userSchema);


export default messageModel;