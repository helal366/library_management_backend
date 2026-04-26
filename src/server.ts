import {Server} from "http"
import mongoose from "mongoose";
import { app } from "./app";
import dotenv from "dotenv";
dotenv.config()

let server:Server;
const PORT =process.env.PORT || 5000;
async function main(){
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("Connected to mongodb using mongoose")
        server = app.listen(PORT, ()=>{
            console.log(`App is listening the port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}
main()
