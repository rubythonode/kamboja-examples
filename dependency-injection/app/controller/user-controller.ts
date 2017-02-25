import { ApiController, val } from "kamboja"
import { UserModel, DisplayNameModel } from "../model/user-model"
import { UserRepository } from "../repository/user-repository"
import { inject } from "inversify"

export class UserController extends ApiController {
    constructor(
        @inject("UserRepository, app/repository/user-repository")
        private repository: UserRepository) {
        super()
    }

    getByPage(offset: number, take: number) {
        return this.repository.getAll();
    }

    get(email) {
        return this.repository.get(email)
    }

    async add( @val.type("UserModel, app/model/user-model") data: UserModel) {
        if (this.validator.isValid()) {
            try {
                await this.repository.add(data)
                return { success: true }
            }
            catch (e) {
                throw new Error("Unable to save user")
            }
        }
        else {
            return {
                success: false,
                validation: this.validator.getValidationErrors()
            };
        }
    }

    async modify(email, @val.type("DisplayNameModel, app/model/user-model") data: DisplayNameModel) {
        if (this.validator.isValid()) {
            try {
                await this.repository.modify(email, data)
                return { success: true }
            }
            catch (e) {
                throw new Error("Unable to save user")
            }
        }
        else {
            return {
                success: false,
                validation: this.validator.getValidationErrors()
            };
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