import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';


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

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = (password) => {
    return bcrypt.compareSync(password, this.password);
};


module.exports = model('users', usersSchema);