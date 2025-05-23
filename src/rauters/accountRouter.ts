import express from "express";
import asyncHandler from "express-async-handler";
import {readerAccountSchema} from "../utils/joiSchemas.js";
import {AccountController} from "../controllers/AccountController.js";
import {ReaderDto} from "../model/ReaderDto.js";

export const accountRouter = express.Router();
const controller = new AccountController();

accountRouter.post('/account', asyncHandler(async (req, res) => {
    const body = req.body;
    const {error} = readerAccountSchema.validate(body);
    if(error) throw new Error(JSON.stringify({status:400, message:error.message}));
    await controller.addReaderAccount(body as ReaderDto);
    res.status(201).send()
}));

accountRouter.get('/account/:username', asyncHandler((req, res) => {

}));

accountRouter.delete('/account/:username', asyncHandler((req, res) => {

}));

accountRouter.put('/account', asyncHandler((req, res) => {

}));


