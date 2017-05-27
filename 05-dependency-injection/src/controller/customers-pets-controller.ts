import { ApiController, val, http } from "kamboja-express"
import { PetModel } from "../model/pet-model"
import { PetService } from "../service/pet-service"
import { val as mval } from "kamboja-mongoose"
import { inject, injectable } from "inversify"

@injectable()
@http.root("/customers/:customerId/pets")
export class CustomersPetsController extends ApiController {

    constructor(@inject("PetService, service/pet-service") private service: PetService) { super() }

    get( @mval.objectid() id: string, @mval.objectid() customerId: string) {
        return this.service.get(id)
    }

    list( @mval.objectid() customerId: string, offset: number, limit = 50) {
        return this.service.list(offset, limit)
    }

    add( @val.type("PetModel, model/pet-model") model: PetModel, @mval.objectid() customerId: string) {
        return this.service.add(customerId, model)
    }

    modify( @mval.objectid() id: string, model: PetModel, @mval.objectid() customerId: string) {
        return this.service.modify(id, model)
    }

    replace( @mval.objectid() id: string, @val.type("PetModel, model/pet-model") model: PetModel, @mval.objectid() customerId: string) {
        return this.service.modify(id, model)
    }

    delete( @mval.objectid() id: string, @mval.objectid() customerId: string) {
        return this.service.delete(id)
    }
}