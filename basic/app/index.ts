import { ExpressEngine } from "kamboja-express"
import { HttpError, Kamboja } from "kamboja"
import "reflect-metadata"

let kamboja = new Kamboja(new ExpressEngine(), {
    controllerPaths: ["app/controller"],
    modelPath: "app/model",
    viewPath: "app/view",
    errorHandler: (e:HttpError) => {
        console.log(e.error)
        e.response.end()
    }
})
kamboja.init().listen(5000)