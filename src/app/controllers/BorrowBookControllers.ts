import  express, { NextFunction, Request, Response }  from 'express';
import { BorrowBook } from '../models/BorrowBookModels';
import { Book } from '../models/BookModel';



export const borrowBooksRoutes = express.Router();
borrowBooksRoutes.get('/', async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const summary = await BorrowBook.find().sort({"bookTitle":1}).lean();
        if(summary.length ===0){
            return res.status(404).send({
                success: false,
                message: "Borrowed books not found.",
                summary: []
            })
        }
        res.status(200).json({
            success: true,
            message: "Borrowed books retrieved successful.",
            summary
        })
    } catch (error) {
        next(error);
    }
});
borrowBooksRoutes.post('/', async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const {isbn} = req.body;
        console.log(isbn)
        const book = await Book.findOneAndUpdate(
            {isbn, copies: {$gt: 0}},
            {$inc : {copies: -1}},
            {new: true}
        );
        if (!book) {
            return res.status(404).json({
            success: false,
            message: "Book not found or Copies not available"
            });
        }
        
        if(book.copies === 0){
            await Book.updateOne(
                {_id:book._id},
                {isAvailable : false}
            )
        };
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate()+7);

        let borrowBook = await BorrowBook.findOne({isbn})
        if(borrowBook){
            borrowBook.totalQuantity += 1;
            borrowBook.dueDate = dueDate;
            await borrowBook.save();
        }else{
            borrowBook = await BorrowBook.create({
                bookTitle: book.title,
                isbn: book.isbn,
                totalQuantity: 1,
                dueDate: dueDate
            })
        }
        res.status(200).json({
            success: true,
            message: "Book borrowed successfully.",
            borrowBook
        })
    } catch (error) {
        next(error)
    }
})
