import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/interfaces";

export const booksSchema = new Schema<IBook>({
  title: {type: String, required: true, trim: true},
  author: {type:String, required:true, trim:true},
  genre: {
    type:String, 
    enum: ['Fiction', 'Non-Fiction', 'Science', 'History', 'Biography', 'Fantasy'],
    default: 'Fantasy',
    required: true
  },
  isbn: {type:String, required:true, trim:true},
  description: {type:String, required: true, trim:true},
  copies: {type:Number, required: true, trim:true},
  isAvailable: {type:Boolean, required:true},
},
{
  versionKey: false, 
  timestamps:true
});
export const Book = model<IBook>("Book", booksSchema)