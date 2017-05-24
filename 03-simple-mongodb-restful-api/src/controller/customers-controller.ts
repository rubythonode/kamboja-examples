import { ApiController, val } from "kamboja-express"
import { CustomerModel } from "../model/customer-model"
import { MongooseHelper, val as mval } from "kamboja-mongoose"

const CustomerOdm = MongooseHelper.getInstance()
    .createModel<CustomerModel>("Customer")

export class CustomersController extends ApiController {
    get( @mval.objectid() id: string) {
        return CustomerOdm.findById(id)
    }

    async list(offset: number, limit = 50) {
        let [count, result] = await Promise.all([
            CustomerOdm.find().count(),
            CustomerOdm.find().limit(limit).skip(offset)
        ])
        return { count: count, result: result }
    }

    add( @val.type("CustomerModel, model/customer-model") model: CustomerModel) {
        return new CustomerOdm(model).save()
    }

    modify( @mval.objectid() id: string, model: CustomerModel) {
        return CustomerOdm.findByIdAndUpdate(id, model)
    }

    replace( @mval.objectid() id: string, @val.type("CustomerModel, model/customer-model") model: CustomerModel) {
        return CustomerOdm.findByIdAndUpdate(id, model)
    }

    delete( @mval.objectid() id: string) {
        return CustomerOdm.findByIdAndRemove(id)
    }
}