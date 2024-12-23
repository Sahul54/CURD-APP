import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/userRoute.js";
// import { getAll } from "./controller/userController.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();


const PORT = process.env.PORT || 5000;
const URL = process.env.MONGOURL;

mongoose.connect(URL).then( ()=>{

    console.log("DB connected sucessfully...");
    app.listen(PORT, ()=>{
        console.log(`Server is running on port: ${PORT}`);
    })
    

}).catch(error => console.log(error))

app.use("/api", route);
app.use('/getAll', route);
app.use('/getOne', route);