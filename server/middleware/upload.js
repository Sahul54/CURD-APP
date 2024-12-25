import multer from 'multer';
import path from 'path';

// Setting up multer storage to specify the folder and file name
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Save images to 'uploads' directory
    cb(null, path.resolve('uploads'));
  },
  filename: function (req, file, cb) {
    // Use a unique name for each uploaded file
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// File filter to allow only images (JPEG, JPG, PNG)
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only JPEG, JPG, PNG images are allowed'));
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
