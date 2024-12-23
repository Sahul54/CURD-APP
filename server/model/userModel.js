import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: { // Corrected the typo here
        type: String,
        required: true
    },
});

export default mongoose.model("User", userSchema);