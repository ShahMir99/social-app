import express from "express";
import cors from "cors"
import postRoute from "./Routes/postRoute.js"
import "./Database/connection.js"
import userRoute from "./Routes/userRoute.js"
import cloudinary from "cloudinary"
import dotenv from "dotenv"


const Port = process.env.PORT || 5000;
const app = express();
import path from "path"
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cloudinary.config({
    cloud_name : "dcjvtqmkw",
    api_key : 213388716948428,
    api_secret : "r8BD00mGPnVCNTE7G2CBlijsSIE",
})


app.use(express.json({limit : "50mb" , extended: true}))
app.use(express.urlencoded({limit : "50mb" , extended: true}))
app.use(cors())


app.use("/post" , postRoute)
app.use("/user" , userRoute)


app.use(express.static(path.join(__dirname , "../frontend/build")))

app.get("*" , (req , res) => {
    res.sendFile(path.resolve(__dirname , "../frontend/build/index.html"))
})


app.listen(Port , () => {
    console.log(`App is Running On PORT ${Port} Sucessfullyy`)
})