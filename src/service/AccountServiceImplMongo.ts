import {AccountService} from "./AccountService.js";
import {Reader} from "../model/Reader.js";
import {Promise} from "mongoose";

export class AccountServiceImplMongo implements AccountService{

    addAccount(reader: Reader): Promise<void> {
        return Promise.resolve(undefined);
    }

    getAccount(userName: string): Promise<Reader> {
        return Promise.resolve(undefined);
    }

    removeAccount(userName: string): Promise<Reader> {
        return Promise.resolve(undefined);
    }

    updateAccount(reader: Reader): Promise<void> {
        return Promise.resolve(undefined);
    }

}