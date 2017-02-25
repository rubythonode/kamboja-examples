import { ExpressEngine } from "kamboja-express"
import { HttpError, Kamboja } from "kamboja"
import { InversifyDependencyResolver } from "./app/wire/dependency-resolver"

let kamboja = new Kamboja(new ExpressEngine(), {
    controllerPaths: ["app/controller"],
    modelPath: "app/model",
    viewPath: "app/view",
    dependencyResolver: new InversifyDependencyResolver()
})
kamboja.init().listen(5000)