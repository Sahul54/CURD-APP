import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    image: {
        type: String, // This will store the URL of the image (local path or Cloudinary URL)
        required: false
    }
});

export default mongoose.model("User", userSchema);
