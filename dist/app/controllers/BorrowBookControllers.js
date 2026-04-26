"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowBooksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const BorrowBookModels_1 = require("../models/BorrowBookModels");
const BookModel_1 = require("../models/BookModel");
exports.borrowBooksRoutes = express_1.default.Router();
exports.borrowBooksRoutes.get('/', async (req, res, next) => {
    try {
        const summary = await BorrowBookModels_1.BorrowBook.find().sort({ "bookTitle": 1 }).lean();
        if (summary.length === 0) {
            return res.status(404).send({
                success: false,
                message: "Borrowed books not found.",
                summary: []
            });
        }
        res.status(200).json({
            success: true,
            message: "Borrowed books retrieved successful.",
            summary
        });
    }
    catch (error) {
        next(error);
    }
});
exports.borrowBooksRoutes.post('/', async (req, res, next) => {
    try {
        const { isbn } = req.body;
        console.log(isbn);
        const book = await BookModel_1.Book.findOneAndUpdate({ isbn, copies: { $gt: 0 } }, { $inc: { copies: -1 } }, { new: true });
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found or Copies not available"
            });
        }
        if (book.copies === 0) {
            await BookModel_1.Book.updateOne({ _id: book._id }, { isAvailable: false });
        }
        ;
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 7);
        let borrowBook = await BorrowBookModels_1.BorrowBook.findOne({ isbn });
        if (borrowBook) {
            borrowBook.totalQuantity += 1;
            borrowBook.dueDate = dueDate;
            await borrowBook.save();
        }
        else {
            borrowBook = await BorrowBookModels_1.BorrowBook.create({
                bookTitle: book.title,
                isbn: book.isbn,
                totalQuantity: 1,
                dueDate: dueDate
            });
        }
        res.status(200).json({
            success: true,
            message: "Book borrowed successfully.",
            borrowBook
        });
    }
    catch (error) {
        next(error);
    }
});
//# sourceMappingURL=BorrowBookControllers.js.map