import { KambojaApplication, Core } from "kamboja-express"
import * as BodyParser from "body-parser"
import { ObjectIdValidator } from "kamboja-mongoose"
import { ErrorHandler } from "./middleware/error-handler"
import { InversifyDependencyResolver } from "./dependency-resolver"

export const app = new KambojaApplication({
    rootPath: __dirname,
    validators: [new ObjectIdValidator()],
    dependencyResolver: new InversifyDependencyResolver()
})
    .use(BodyParser.json())
    .use(new ErrorHandler())
    .init()