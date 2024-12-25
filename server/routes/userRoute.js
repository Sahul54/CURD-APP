import express from "express";
import { create, deleteUser, getAll, getOne, update } from "../controller/userController.js";
import upload from "../middleware/upload.js"; 

const route = express.Router();

route.post("/create", upload.single('image'), create); 
route.get("/getAll", getAll);
route.get("/getOne/:id", getOne);
route.put("/update/:id", upload.single('image'), update);  
route.delete("/deleteUser/:id", deleteUser);

export default route;
