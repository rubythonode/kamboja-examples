import { MongooseHelper } from "kamboja-mongoose"
import { CustomerModel } from "./customer-model"

export const CustomerOdm = MongooseHelper.getInstance()
    .createModel<CustomerModel>("Customer")