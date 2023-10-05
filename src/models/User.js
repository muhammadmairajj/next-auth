import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    }, 
    password: {
        type: String,
        require: false,
    },
  
}, { timestamps: true })

export default mongoose.models.User || mongoose.model("User", UserSchema);