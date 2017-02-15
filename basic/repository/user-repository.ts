import {UserModel, DisplayNameModel} from "../model/user-model"
import * as Lodash from "lodash"

function delay(ms:number){
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            resolve()
        }, ms);
    })
}

export class UserRepository {
    static instance: UserRepository = new UserRepository()
    private users: UserModel[] = []

    async add(user: UserModel) {
        await delay(20)
        this.users.push(user)
    }

    async modify(email, data: DisplayNameModel) {
        await delay(20)
        let user = this.users.filter(x => x.email == email)[0]
        user.displayName = data.displayName
    }

    async delete(email) {
        await delay(20)
        Lodash.remove(this.users, x => x.email == email)
    }

    async get(email) {
        await delay(20)
        return this.users.filter(x => x.email == email)[0]
    }

    async getAll() {
        await delay(20)
        return this.users;
    }

    async clear(){
        await delay(20)
        this.users = []
    }
}