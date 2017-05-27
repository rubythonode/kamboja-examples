import { PetModel } from "../model/pet-model"
import { CustomerModel } from "../model/customer-model"
import { injectable } from "inversify"
import { MongooseHelper } from "kamboja-mongoose"
import { Model, Document } from "mongoose"

@injectable()
export class PetService {
    private CustomerOdm: Model<CustomerModel & Document>;
    private PetOdm: Model<PetModel & Document>;

    constructor() {
        this.CustomerOdm = MongooseHelper.getInstance()
            .createModel<CustomerModel>("Customer")
        this.PetOdm = MongooseHelper.getInstance()
            .createModel<PetModel>("Pet")
    }
    async add(customerId: string, model: PetModel) {
        let customer = await this.CustomerOdm.findById(customerId)
        model.customer = customer._id
        return new this.PetOdm(model).save()
    }

    get(id: string) {
        return this.PetOdm.findById(id)
    }

    async list(offset: number, limit: number) {
        let [count, result] = await Promise.all([
            this.PetOdm.find().count(),
            this.PetOdm.find().limit(limit).skip(offset)
        ])
        return { count: count, result: result }
    }

    modify(id: string, model: PetModel) {
        return this.PetOdm.findByIdAndUpdate(id, model)
    }

    delete(id: string) {
        return this.PetOdm.findByIdAndRemove(id)
    }
}