import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    id: { type: String, require: true, unique: true, trim: true, lowercase: true,}, 
    name: { type: String, require: true, minlength: 1, maxlength: 15, trim: true,},
    password: { type: String, require: true, trim: true,}
})


const User = mongoose.model('user', UserSchema)
export default User;