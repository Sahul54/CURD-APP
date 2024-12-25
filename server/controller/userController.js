import User from "../model/userModel.js"; 
import fs from 'fs';

// Utility function to delete an image file
const deleteImageFile = (filePath) => {
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
};

// User data create
export const create = async (req, res) => {
    try {
        const imageUrl = req.file ? `/${req.file.filename}` : 'uploads/default-avatar.jpg';

        const userData = new User({
            ...req.body,
            image: imageUrl
        });

        const savedData = await userData.save();
        res.status(200).json(savedData);
    } catch (error) {
        console.error("Error in create:", error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};

// User data update
export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);

        if (!userExist) {
            return res.status(404).json({ msg: "User not found" });
        }

        const imageUrl = req.file ? `uploads/${req.file.filename}` : userExist.image;

        // Delete old image if a new one is uploaded
        if (req.file && userExist.image !== 'uploads/default-avatar.jpg') {
            deleteImageFile(userExist.image);
        }

        const updatedData = await User.findByIdAndUpdate(
            id,
            { ...req.body, image: imageUrl },
            { new: true }
        );

        res.status(200).json(updatedData);
    } catch (error) {
        console.error("Error in update:", error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};

// User data getAll
export const getAll = async (req, res) => {
    try {
        const userData = await User.find();
        if (!userData) {
            return res.status(404).json({ msg: "No users found!" });
        }
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};

// User data getOne
export const getOne = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);

        if (!userExist) {
            return res.status(404).json({ msg: "User not found!" });
        }

        res.status(200).json(userExist);
    } catch (error) {
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};

// User data delete
export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);

        if (!userExist) {
            return res.status(404).json({ msg: "User not found!" });
        }

        // Delete the user's image if it's not the default avatar
        if (userExist.image !== 'uploads/default-avatar.jpg') {
            deleteImageFile(userExist.image);
        }

        await User.findByIdAndDelete(id);
        res.status(200).json({ msg: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};
