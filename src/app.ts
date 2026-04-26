import dotenv from "dotenv";
dotenv.config()
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors"
import { booksRoutes } from "./app/controllers/BookControllers";
import { borrowBooksRoutes } from "./app/controllers/BorrowBookControllers";

export const app:Application = express();
app.use(cors({
  origin:[process.env.CLIENT_URL as string, "http://localhost:5173"],
  credentials: true
}))
app.use(express.json());
app.use('/api/books', booksRoutes);
app.use('/api/borrow_books', borrowBooksRoutes);

app.get('/', (req:Request, res:Response, next:NextFunction) => {
  try {
    res.send('Welcome to Library Management System.')
  } catch (error) {
    next(error)
  }
});
app.use(
  (error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
      error
    });
  },
);