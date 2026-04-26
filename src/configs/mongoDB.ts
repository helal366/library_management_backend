import dotenv from "dotenv";
dotenv.config();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD as string);
const DB_NAME = process.env.DB_NAME;

export const MONGODB_ALTAS_URI = 
`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.tmsuubo.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

// "mongodb+srv://<db_username>:<db_password>@cluster0.tmsuubo.mongodb.net/?appName=Cluster0";