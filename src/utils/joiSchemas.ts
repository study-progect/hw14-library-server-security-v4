import Joi, {ObjectSchema} from "joi";
import {BookDto} from "../model/BookDto.js";

export const bookDtoSchema:ObjectSchema<BookDto> = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    genre: Joi.string().required(),
    quantity: Joi.number().positive().max(100)
})

export const bookIdSchema = Joi.string().length(36).required()

// export const readerSchema = Joi.string().required();

export const readerSchema = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().email().required()
});

export const pickUpBookSchema = Joi.object({
    id:Joi.string().length(36).required(),
    reader: Joi.string().required() //to scale
})

export const readerAccountSchema = Joi.object({
    userName:Joi.string().min(5).max(50).required(),
    password:Joi.string().min(8).required(),
    email:Joi.string().email().required(),
    birthday: Joi.string().length(8).pattern(/^\d{2}\.\d{2}\.\d{2}$/).required()
})