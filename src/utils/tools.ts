import {BookDto} from "../model/BookDto.js";
import {Book, BookGenres, BookStatus} from "../model/Book.js";
import {v4 as uuidv4} from 'uuid';
import {ReaderDto} from "../model/ReaderDto.js";
import {pool} from "../config/libConfig.js";
import bcrypt from "bcryptjs";
import {Reader} from "../model/Reader.js";

export function getGenre(genre: string) {
    const bookGenre =
        Object.values(BookGenres).find(v => v === genre)
    if(!bookGenre) throw new Error (JSON.stringify({status: 400, message: "Wrong genre"}))
    return bookGenre;
}
export const getStatus = (status: string) => {
const bookSt =
    Object.values(BookStatus).find(v => v === status)
if(!bookSt) throw new Error (JSON.stringify({status: 400, message: "Wrong genre"}))
return bookSt;
}

export const convertBookDtoToBook = (dto: BookDto):Book => {
    return{
        id: uuidv4(),
        author: dto.author,
        title: dto.title,
        status: BookStatus.ON_STOCK,
        genre: getGenre(dto.genre),
        pickList: []
    }
}

export const convertBookToBookDto = (book:Book):BookDto => {
    return {
        title: book.title,
        author: book.author,
        genre: book.genre
    }

// export const getOrCreateReader = async (dto: ReaderDto): Promise<Reader> =>{
//     const [rows] = await pool.query('SELECT * FROM readers WHERE email = ?', [dto.email]);
//     const existing = rows as any[];
//     if (existing.length > 0) {
//     return {
//         id: existing[0].reader_id,
//         name: existing[0].name,
//         email: existing[0].email,
//     };
// }
// const newId = uuidv4();
// await pool.query('INSERT INTO readers (reader_id, name, email) VALUES (?, ?, ?)', [newId, dto.name, dto.email]);
// return {
//     id: newId,
//     name: dto.name,
//     email: dto.email
// };
}
export function convertReaderDtoToReader(dto:ReaderDto):Reader {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(dto.password, salt);
    const reader = {
        _id: dto.userName,
        passHash: hash,
        email: dto.email,
        birthday: dto.birthday,
    } as Reader;
    console.log('Reader object:', reader); // Debug log
    return reader;
}