import * as mongoose from "mongoose";
import {BookGenres, BookStatus} from "./Book.js";

const bookMongoSchema = new mongoose.Schema({
    id:{type:String,required:true},
    title:{type:String,required:true},
    author:{type:String,required:true},
    genre:{type:String,enum:BookGenres,required:true},
    status:({type:String, enum:BookStatus,required:true}),
    pickList:{type:[{reader:{type:String},date:{type:String}}]}
})

export const BookModel = mongoose.model('Book',bookMongoSchema, 'books_collection')