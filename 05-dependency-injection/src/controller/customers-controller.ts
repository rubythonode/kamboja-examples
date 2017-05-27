import { ApiController, val } from "kamboja-express"
import { CustomerService } from "../service/customer-service"
import { CustomerModel } from "../model/customer-model"
import { val as mval } from "kamboja-mongoose"
import { inject, injectable } from "inversify"

export class CustomersController extends ApiController {
    constructor(@inject("CustomerService, service/customer-service") private service: CustomerService) { super() }

    get( @mval.objectid() id: string) {
        return this.service.get(id)
    }

    async list(offset: number, limit = 50) {
        return this.service.list(offset, limit)
    }

    add( @val.type("CustomerModel, model/customer-model") model: CustomerModel) {
        return this.service.add(model)
    }

    modify( @mval.objectid() id: string, model: CustomerModel) {
        return this.service.modify(id, model)
    }

    replace( @mval.objectid() id: string, @val.type("CustomerModel, model/customer-model") model: CustomerModel) {
        return this.service.modify(id, model)
    }

    delete( @mval.objectid() id: string) {
        return this.service.delete(id)
    }
}