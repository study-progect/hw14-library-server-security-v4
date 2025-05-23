import {ReaderDto} from "../model/ReaderDto.js";
import {convertReaderDtoToReader} from "../utils/tools.js";
import {AccountService} from "../service/AccountService.js";
import {AccountServiceImplMongo} from "../service/AccountServiceImplMongo.js";
import {Reader} from "../model/Reader.js";


export class AccountController {

    private service:AccountService = new AccountServiceImplMongo()

    async addReaderAccount(dto: ReaderDto) {
        const reader: Reader = convertReaderDtoToReader(dto)
        await this.service.addAccount(reader)
    }
    async getReaderAccount(userName:string) {
        return await this.service.getAccount(userName)
    }

    async updateReaderAccount(dto: ReaderDto) {
        const reader:Reader = convertReaderDtoToReader(dto)
        return await this.service.updateAccount(reader)
    }

    async removeReaderAccount(userName:string) {
        return await this.service.removeAccount(userName)
    }
}