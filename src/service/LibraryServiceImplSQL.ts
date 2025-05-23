import {LibraryService} from "./LibraryService.js";
import {Book, BookGenres, BookStatus, Reader} from "../model/Book.js";
import {pool} from "../config/libConfig.js";

export class LibraryServiceImplSQL implements LibraryService{

    async addBook(book: Book): Promise<boolean> {
        try {
            const sql = `
            INSERT INTO books (book_id, title, author, genre, status)
            VALUES (?, ?, ?, ?, ?)
        `;
            const values = [book.id, book.title, book.author, book.genre, book.status];
            const result = await pool.query(sql, values);
            return Promise.resolve(true);
        } catch (err) {
            console.error('Failed to insert book:', err);
            return Promise.resolve(false);
        }
    }


    async getAllBooks(): Promise<Book[]> {
        // const result = await pool.query('SELECT * FROM books');
        // return Promise.resolve(result as unknown as Book[]);
        const [result] = await pool.query('SELECT * FROM books');
        return result as Book[];
    }


    async getBooksByGenre(genre: BookGenres): Promise<Book[]> {
        const [result] = await pool.query('SELECT * FROM books WHERE genre = ?', [genre]);
        return result as Book[];
    }

    async getBooksByGenreAndStatus(gen: string, st: string): Promise<Book[]> {
        const [result] = await pool.query('SELECT * FROM books WHERE genre = ? AND status = ?', [gen, st]);
        return result as Book[];    }

    async pickUpBook(id: string): Promise<void> {

        try {
             await pool.query('UPDATE books SET status = ? WHERE book_id = ?', [BookStatus.ON_HAND, id]);

        } catch (err) {
            console.error('Failed to update book status:', err);
            throw err;
        }
    }

   async removeBook(id: string): Promise<Book> {
       try {
           const [rows] = await pool.query('SELECT * FROM books WHERE book_id = ?', [id]);
           const books = rows as Book[];
           if (books.length === 0) {
               throw new Error(`No book found with id: ${id}`);
           }
            await pool.query('DELETE FROM books WHERE book_id = ?', [id]);
           return books[0];
       } catch (err) {
           console.error('Failed to delete book:', err);
           throw err;
       }
    }

    async returnBook(id: string, reader: Reader): Promise<void> {
        const [rows] = await pool.query('SELECT * FROM books WHERE book_id = ?', [id]);
        const books = rows as Book[];
        if (books.length === 0) {
            throw new Error(`No book found with id: ${id}`);
        }

        await pool.query('UPDATE books SET status = ? WHERE book_id = ?', [BookStatus.ON_HAND, id]);

        await pool.query(
            'INSERT INTO pick_records (book_id, reader_id, date) VALUES (?, ?, ?)',
            [id, reader.id, new Date()]
        );
    }


}