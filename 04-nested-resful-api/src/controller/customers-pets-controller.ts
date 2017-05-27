import { ApiController, val, http } from "kamboja-express"
import { CustomerOdm } from "../model/customer-model"
import { PetModel, PetOdm } from "../model/pet-model"
import { val as mval } from "kamboja-mongoose"

@http.root("/customers/:customerId/pets")
export class CustomersPetsController extends ApiController {

    get( @mval.objectid() id: string, @mval.objectid() customerId:string) {
        return PetOdm.findById(id)
    }

    async list(@mval.objectid() customerId:string, offset: number, limit = 50) {
        let [count, result] = await Promise.all([
            PetOdm.find().count(),
            PetOdm.find().limit(limit).skip(offset)
        ])
        return { count: count, result: result }
    }

    async add( @val.type("PetModel, model/pet-model") model: PetModel, @mval.objectid() customerId:string) {
        let customer = await CustomerOdm.findById(customerId)
        model.customer = customer._id
        return new PetOdm(model).save()
    }

    modify( @mval.objectid() id: string, model: PetModel, @mval.objectid() customerId:string) {
        return PetOdm.findByIdAndUpdate(id, model)
    }

    replace( @mval.objectid() id: string, @val.type("PetModel, model/pet-model") model: PetModel, @mval.objectid() customerId:string) {
        return PetOdm.findByIdAndUpdate(id, model)
    }

    delete( @mval.objectid() id: string, @mval.objectid() customerId:string) {
        return PetOdm.findByIdAndRemove(id)
    }
}