import { ApiController, val } from "kamboja"
import { UserModel, DisplayNameModel } from "../model/user-model"
import { UserRepository } from "../repository/user-repository"

export class UserController extends ApiController {
    private repository: UserRepository;

    constructor() {
        super()
        this.repository = UserRepository.instance;
    }

    getByPage(offset: number, take: number) {
        return this.repository.getAll();
    }

    get( @val.email() email) {
        return this.repository.get(email)
    }

    async add( @val.type("UserModel, app/model/user-model") data: UserModel) {
        try {
            await this.repository.add(data)
        }
        catch (e) {
            throw new Error("Unable to save user")
        }
    }

    async modify(email, @val.type("DisplayNameModel, app/model/user-model") data: DisplayNameModel) {
        try {
            await this.repository.modify(email, data)
        }
        catch (e) {
            throw new Error("Unable to save user")
        }
    }

    delete( @val.email() email) {
        try {
            this.repository.delete(email)
        }
        catch (e) {
            throw new Error("Unable to delete user")
        }
    }
}