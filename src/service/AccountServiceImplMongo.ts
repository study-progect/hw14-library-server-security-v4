import {AccountService} from "./AccountService.js";
import {Reader} from "../model/Reader.js";
import {ReaderModel} from "../model/ReaderMongo.js";

export class AccountServiceImplMongo implements AccountService{

   async addAccount(reader: Reader): Promise<void> {
       const isExists = await ReaderModel.findOne({_id:reader._id})
       if (isExists) return Promise.resolve(undefined);
       const readerDoc = new ReaderModel(reader);
       await readerDoc.save();
    }

    async getAccount(userName: string): Promise<Reader> {
        const reader = await ReaderModel.findOne({ _id:userName });
        if (!reader) {
            throw new Error(`User with username ${userName} not found`);
        }
        return reader
    }

   async removeAccount(userName: string): Promise<Reader> {
       const reader = await ReaderModel.findOneAndDelete({ _id:userName })
       if (!reader) throw new Error(JSON.stringify({status:404, message:`Account with id ${userName} not found`}))
       return Promise.resolve(reader as Reader)
    }

   async updateAccount(reader: Reader): Promise<void> {
        await ReaderModel.updateOne({ _id: reader._id },{ $set: reader });
       // const isExists = await ReaderModel.findOne({_id:reader._id})
       //  if(!isExists) throw new Error(JSON.stringify({status:404, message:`Account with id ${reader._id} not found`}))
       //  await ReaderModel.updateOne(reader)
    }

}