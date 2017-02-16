import * as Lodash from "lodash"
import { val } from "kamboja"

export class UserModel {
    @val.email()
    @val.required()
    email: string

    @val.required()
    displayName: string
}
 
export class DisplayNameModel{
    @val.required()
    displayName: string
}