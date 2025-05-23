import mongoose from "mongoose";
import {Reader} from "./Reader.js";


const ReaderMongoSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    passHash: { type: String, required: true },
    email: { type: String, required: true },
    birthday: { type: String, required: true },
})
export const ReaderModel = mongoose.model<Reader>('Reader',ReaderMongoSchema, 'readers_collection')