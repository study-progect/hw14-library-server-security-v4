import {Book, BookGenres} from "../model/Book.js";
import {Reader} from "../model/Reader.js";

export interface LibraryService {
     addBook: (book:Book) => Promise<boolean>;
     removeBook:(id:string) => Promise<Book>;
     pickUpBook:(id:string) => Promise<void>;
     // returnBook:(id:string, reader:string) => Promise<void>;
     returnBook:(id:string, reader:Reader) => Promise<void>;

     getAllBooks:() => Promise<Book[]>;
     getBooksByGenre:(genre: BookGenres) => Promise<Book[]>;
     getBooksByGenreAndStatus:(gen:string,st:string) => Promise<Book[]>;
 }