import express from "express";
import { create, deleteUser, getAll, getOne, update } from "../controller/userController.js";
import { upload } from "../middleware/multer.js";  // Import multer for file handling

const route = express.Router();

route.post("/create", upload.single('image'), create);  // Handling image upload in POST request
route.get("/getAll", getAll);
route.get("/getOne/:id", getOne);
route.put("/update/:id", upload.single('image'), update);  // Handling image upload in PUT request
route.delete("/deleteUser/:id", deleteUser);

export default route;
