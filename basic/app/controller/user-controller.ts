import {ApiController, val} from "kamboja"
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

    get(email) {
        return this.repository.get(email)
    }

    add(@val.type("UserModel, app/model/user-model") data: UserModel) {
        if (this.validator.isValid()) {
            try {
                this.repository.add(data)
                return { success: true }
            }
            catch (e) {
                throw new Error("Unable to save user")
            }
        }
        else {
            return this.validator.getValidationErrors();
        }
    }

    modify(email, @val.type("DisplayNameModel, app/model/user-model") data: DisplayNameModel) {
        if (this.validator.isValid()) {
            try {
                this.repository.modify(email, data)
                return { success: true }
            }
            catch (e) {
                throw new Error("Unable to save user")
            }
        }
    }

    delete(email) {
        try {
            this.repository.delete(email)
            return { success: true }
        }
        catch (e) {
            throw new Error("Unable to delete user")
        }
    }
}