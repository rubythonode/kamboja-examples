import { KambojaApplication, Core } from "kamboja-express"
import * as BodyParser from "body-parser"
import { ObjectIdValidator } from "kamboja-mongoose"
import { ErrorHandler } from "./middleware/error-handler"

export const app = new KambojaApplication(<Core.KambojaOption>{
    rootPath: __dirname,
    validators: [new ObjectIdValidator()]
})
    .use(BodyParser.json())
    .use(new ErrorHandler())
    .init()