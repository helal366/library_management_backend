import {Server} from "http"
import mongoose from "mongoose";
import { app } from "./app";
import dotenv from "dotenv";
import { MONGODB_ALTAS_URI } from "./configs/mongoDB";
dotenv.config()

let server:Server;
const PORT =process.env.PORT || 5000;
async function main(){
    try {
        await mongoose.connect(MONGODB_ALTAS_URI);
        console.log("Connected to mongodb using mongoose")
        server = app.listen(PORT, ()=>{
            console.log(`App is listening the port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}
main()
