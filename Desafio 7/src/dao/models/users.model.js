import { Schema, model } from 'mongoose';


const usersSchema = new Schema(
    {
        first_name: { type: String, require: true },
        last_name: { type: String, require: true },
        email: { type: String, require: true, unique: true },
        age: { type: Number },
        password: { type: String, require: true },
    },
    { versionKey: false }
);


export default model('users', usersSchema);