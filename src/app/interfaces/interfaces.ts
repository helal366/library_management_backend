export type Genre =
  | 'Fiction'
  | 'Non-Fiction'
  | 'Science'
  | 'History'
  | 'Biography'
  | 'Fantasy';

export interface IBook {
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description: string;
  copies: number;
  isAvailable: boolean;
}
// Book Title, ISBN, Total Quantity
export interface IBorrowBook{
  bookTitle: string,
  isbn: string,
  totalQuantity: number,
  dueDate: Date
}