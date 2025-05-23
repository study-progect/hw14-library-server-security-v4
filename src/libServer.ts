
import express from 'express';
import {db} from "./config/libConfig.js";
import {errorHandler} from "./errorHandler/errorHandler.js";
import {libRouter} from "./rauters/libRouter.js";
import morgan from "morgan";
import * as fs from "node:fs";
import * as mongoose from "mongoose";
import dotenv from "dotenv";
import {accountRouter} from "./rauters/accountRouter.js";

export const launchServer = () => {
    //===============load environments===
    dotenv.config()
    //===============Mongo Connected=============================
    mongoose.connect(db).then(() => console.log("DB connected"))
        .catch(err => console.log(err))
    const logStream = fs.createWriteStream('./src/access.log',{flags:"a"})
    const app = express();
    app.listen(process.env.PORT, () => console.log(`Server runs at http://localhost:${process.env.PORT}`))

    //===============Middleware====================
    app.use(express.json());
    app.use(morgan('dev'));
    app.use(morgan('combined', {stream: logStream}))
    //===============Router========================
    app.use('/account', accountRouter)
    app.use('/api',libRouter);
    //==============ErrorHandler===================
    app.use(errorHandler);

}