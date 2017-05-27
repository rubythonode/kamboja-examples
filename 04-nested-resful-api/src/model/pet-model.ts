import { val } from "kamboja-express"
import { MongooseHelper } from "kamboja-mongoose"
import { CustomerModel } from "./customer-model"

export class PetModel {
    @val.required()
    @val.type("string")
    name: string

    @val.required()
    @val.type("number")
    age: number

    @val.type("CustomerModel, model/customer-model")
    customer:CustomerModel

    @val.type("date")
    createdAt: Date

    @val.type("date")
    updatedAt: Date
}

export const PetOdm = MongooseHelper.getInstance()
    .createModel<PetModel>("Pet")