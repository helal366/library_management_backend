import express, {  NextFunction, Request, Response } from "express";
import { Book } from "../models/BookModel";
import mongoose from "mongoose";

export const booksRoutes = express.Router();
booksRoutes.get('/', async (req:Request, res:Response, next:NextFunction)=>{
     try {
          const books =await Book.find().sort({"title":1}).lean();
          if(books.length === 0){
            return res.status(404).json({
              success: false,
              message: "Books not found.",
              books: []
            })
          }
          const formattedBooks = books.map(book=>({
            ...book,
            _id: book._id.toString()
          }))
          res.status(200).send({
            success: true,
            message: "Books retrieved successfully.",
            books: formattedBooks
          });
        } catch (error) {
          next(error)
        }
});

booksRoutes.post('/', async (req:Request, res:Response, next:NextFunction)=>{
    try {
          const book = new Book(req.body);
          const savedBook = await book.save();
          res.status(201).json({
            success: true,
            message: "Book posted successfully.",
            savedBook
          });
        } catch (error) {
          next(error);
        }
});
booksRoutes.patch('/:id', async (req:Request, res:Response, next:NextFunction)=>{
    try {
      const id = req.params.id as string;

        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({
            success: false,
            message: "Invalid book ID",
          });
        }
      const updatedBook = await Book.findByIdAndUpdate(id, req.body, {new:true, runValidators: true});
      if(!updatedBook){
        return res.status(404).json({
          succes: false,
          message: "Book not found."
        })
      }
      res.status(200).json({
        success:true,
        message: "Book updated successfully.",
        updatedBook
      })
    } catch (error) {
      next(error)
    }
});
booksRoutes.delete('/:id', async (req:Request, res:Response, next:NextFunction)=>{
  try {
      const id = req.params.id as string;
       if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
        success: false,
        message: "Invalid book ID",
      });
    }
      const deletedBook = await Book.findByIdAndDelete(id);
      if(!deletedBook){
        return res.status(404).json({
          success: false,
          message: "Book not found"
        })
      }
      res.status(200).json({
          success: true,
          message: "Book deleted successfully."
      })
    } catch (error) {
      next(error)
    }
})