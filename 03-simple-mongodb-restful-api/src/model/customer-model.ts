import { val } from "kamboja-express"
import { MongooseHelper } from "kamboja-mongoose"

/**
 * Customer Model (the model behavior)
 * A data model hold the values of customer,
 * this class will do noting only describe behavior 
 * of customer data.
 */
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

/**
 * CustomerOdm (the model action)
 * This Mongoose model will do all database action
 * create/read/update/delete the schema of this model is 
 * the same with Document Model above. 
 */
export const CustomerOdm = MongooseHelper.getInstance()
    .createModel<CustomerModel>("Customer")