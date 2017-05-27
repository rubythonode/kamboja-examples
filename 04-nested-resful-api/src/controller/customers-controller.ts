import { ApiController, val } from "kamboja-express"
import { CustomerModel, CustomerOdm } from "../model/customer-model"
import { val as mval } from "kamboja-mongoose"

export class CustomersController extends ApiController {

    //GET /customers/:id
    get( @mval.objectid() id: string) {
        return CustomerOdm.findById(id)
    }

    //GET /customers?offset=<value>&limit=<optional>
    async list(offset: number, limit = 50) {
        let [count, result] = await Promise.all([
            CustomerOdm.find().count(),
            CustomerOdm.find().limit(limit).skip(offset)
        ])
        return { count: count, result: result }
    }

    //POST /customers
    add( @val.type("CustomerModel, model/customer-model") model: CustomerModel) {
        return new CustomerOdm(model).save()
    }

    //PATCH /customers/:id
    modify( @mval.objectid() id: string, model: CustomerModel) {
        return CustomerOdm.findByIdAndUpdate(id, model)
    }

    //PUT /customers/:id
    replace( @mval.objectid() id: string, @val.type("CustomerModel, model/customer-model") model: CustomerModel) {
        return CustomerOdm.findByIdAndUpdate(id, model)
    }

    //DELETE /customers/:id
    delete( @mval.objectid() id: string) {
        return CustomerOdm.findByIdAndRemove(id)
    }
}