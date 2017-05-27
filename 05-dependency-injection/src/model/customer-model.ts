import { val } from "kamboja-express"
import { MongooseHelper } from "kamboja-mongoose"

export class CustomerModel {
    @val.required()
    @val.email()
    @val.type("string")
    email: string

    @val.required()
    @val.type("string")
    name: string

    @val.type("date")
    createdAt: Date

    @val.type("date")
    updatedAt: Date
}
