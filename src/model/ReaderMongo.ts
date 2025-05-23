import mongoose from "mongoose";
import {Reader} from "./Reader.js";


const ReaderMongoSchema = new mongoose.Schema({

})
export const ReaderModel = mongoose.model<Reader>('Reader',ReaderMongoSchema, 'readers_collection')