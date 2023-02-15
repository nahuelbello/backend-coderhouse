import { Schema, model } from "mongoose";


const registerCollection = "register";

const registerSchema = new Schema(
    {
        first_name: { type: String, require: true },
        last_name: { type: String, require: true },
        email: { type: String, require: true, unique: true },
        age: { type: Number },
        password: { type: String, require: true },
    },
    { versionKey: false }
);

const registerModel = model(registerCollection, registerSchema);


export default registerModel;