import { ExpressEngine } from "kamboja-express"
import { HttpError, Kamboja } from "kamboja"
import { InversifyDependencyResolver } from "./wire/dependency-resolver"

let kamboja = new Kamboja(new ExpressEngine(), {
    controllerPaths: ["app/controller"],
    modelPath: "app/model",
    viewPath: "app/view",
    errorHandler: (e:HttpError) => {
        console.log(e.error)
        e.response.end()
    },
    dependencyResolver: new InversifyDependencyResolver()
})
kamboja.init().listen(5000)