import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Define the storage engine for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = './uploads/';
        // Create 'uploads' directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir); // Save to 'uploads' directory
    },
    filename: (req, file, cb) => {
        // Generate a unique filename with timestamp and original file extension
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

// Initialize multer with defined storage, file size limit, and file filter
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Set maximum file size to 10MB
    fileFilter: (req, file, cb) => {
        // Specify allowed file types (JPEG, JPG, PNG, GIF)
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            // If file is valid, proceed
            return cb(null, true);
        } else {
            // If file is not valid, return an error
            cb(new Error('Only image files are allowed!'));
        }
    }
});

// Export the upload middleware for use in routes
export { upload };
