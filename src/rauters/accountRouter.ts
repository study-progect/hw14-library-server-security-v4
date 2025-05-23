import express from "express";
import asyncHandler from "express-async-handler";
import {readerAccountSchema} from "../utils/joiSchemas.js";
import {AccountController} from "../controllers/AccountController.js";
import {ReaderDto} from "../model/ReaderDto.js";
import {Reader} from "../model/Reader.js";

export const accountRouter = express.Router();
const controller = new AccountController();

accountRouter.post('/account', asyncHandler(async (req, res) => {
    const body = req.body;
    // const {error} = readerAccountSchema.validate(body);
    // if(error) throw new Error(JSON.stringify({status:400, message:error.message}));
    await controller.addReaderAccount(body as ReaderDto);
    res.status(201).send()
}));

accountRouter.get('/account/:username', asyncHandler(async (req, res) => {
    const userName = req.params.username
    // const {error} = readerAccountSchema.extract('userName').validate(userName)
    // if(error) throw new Error(JSON.stringify({status:400, message:error.message}));
    const result = await controller.getReaderAccount(userName);
    res.type("application/json").json(result as unknown as Reader)
}));

accountRouter.delete('/account/:username', asyncHandler(async (req, res) => {
    const userName = req.params.username
    const {error} = readerAccountSchema.extract('userName').validate(userName)
    if(error) throw new Error(JSON.stringify({status:400, message:error.message}));
    const result = await controller.removeReaderAccount(userName);
    res.type("application/json").json(result)
}));

accountRouter.put('/account', asyncHandler(async (req, res) => {
    const body = req.body;
    const {error} = readerAccountSchema.validate(body);
    if(error) throw new Error(JSON.stringify({status:400, message:error.message}));
    await controller.updateReaderAccount(body as ReaderDto);
    res.status(201).send()
}));


