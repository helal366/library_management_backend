import { model, Schema } from "mongoose";
import { IBorrowBook } from "../interfaces/interfaces";

export const borrowBooksSchema = new Schema<IBorrowBook>({
    bookTitle: {type:String, required: true, trim: true},
    isbn: {type:String, required: true, trim: true},
    totalQuantity: {type:Number, required: true},
    dueDate: {type:Date, required: true, }
},
{versionKey:false, timestamps: true});
export const BorrowBook = model<IBorrowBook>("BorrowBook", borrowBooksSchema);