import { ExpressEngine } from "kamboja-express"
import { HttpError, Kamboja } from "kamboja"
import "reflect-metadata"

let kamboja = new Kamboja(new ExpressEngine(), {
    controllerPaths: ["app/controller"],
    modelPath: "app/model",
    viewPath: "app/view"
})
kamboja.init().listen(5000)