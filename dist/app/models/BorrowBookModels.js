"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowBook = exports.borrowBooksSchema = void 0;
const mongoose_1 = require("mongoose");
exports.borrowBooksSchema = new mongoose_1.Schema({
    bookTitle: { type: String, required: true, trim: true },
    isbn: { type: String, required: true, trim: true },
    totalQuantity: { type: Number, required: true },
    dueDate: { type: Date, required: true, }
}, { versionKey: false, timestamps: true });
exports.BorrowBook = (0, mongoose_1.model)("BorrowBook", exports.borrowBooksSchema);
//# sourceMappingURL=BorrowBookModels.js.map