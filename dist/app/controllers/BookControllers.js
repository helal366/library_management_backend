"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const BookModel_1 = require("../models/BookModel");
const mongoose_1 = __importDefault(require("mongoose"));
exports.booksRoutes = express_1.default.Router();
exports.booksRoutes.get('/', async (req, res, next) => {
    try {
        const books = await BookModel_1.Book.find().sort({ "title": 1 }).lean();
        if (books.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Books not found.",
                books: []
            });
        }
        const formattedBooks = books.map(book => ({
            ...book,
            _id: book._id.toString()
        }));
        res.status(200).send({
            success: true,
            message: "Books retrieved successfully.",
            books: formattedBooks
        });
    }
    catch (error) {
        next(error);
    }
});
exports.booksRoutes.post('/', async (req, res, next) => {
    try {
        const book = new BookModel_1.Book(req.body);
        const savedBook = await book.save();
        res.status(201).json({
            success: true,
            message: "Book posted successfully.",
            savedBook
        });
    }
    catch (error) {
        next(error);
    }
});
exports.booksRoutes.patch('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid book ID",
            });
        }
        const updatedBook = await BookModel_1.Book.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedBook) {
            return res.status(404).json({
                succes: false,
                message: "Book not found."
            });
        }
        res.status(200).json({
            success: true,
            message: "Book updated successfully.",
            updatedBook
        });
    }
    catch (error) {
        next(error);
    }
});
exports.booksRoutes.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid book ID",
            });
        }
        const deletedBook = await BookModel_1.Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Book deleted successfully."
        });
    }
    catch (error) {
        next(error);
    }
});
//# sourceMappingURL=BookControllers.js.map