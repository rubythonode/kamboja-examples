import { CustomerModel } from "../model/customer-model"
import { injectable } from "inversify"
import { MongooseHelper } from "kamboja-mongoose"
import { Model, Document } from "mongoose"

@injectable()
export class CustomerService {
    private CustomerOdm: Model<CustomerModel & Document>;

    constructor() {
        this.CustomerOdm = MongooseHelper.getInstance()
            .createModel<CustomerModel>("Customer")
    }

    async add(model: CustomerModel) {
        return new this.CustomerOdm(model).save()
    }

    get(id: string) {
        return this.CustomerOdm.findById(id)
    }

    async list(offset: number, limit: number) {
        let [count, result] = await Promise.all([
            this.CustomerOdm.find().count(),
            this.CustomerOdm.find().limit(limit).skip(offset)
        ])
        return { count: count, result: result }
    }

    modify(id: string, model: CustomerModel) {
        return this.CustomerOdm.findByIdAndUpdate(id, model)
    }

    delete(id: string) {
        return this.CustomerOdm.findByIdAndRemove(id)
    }
}