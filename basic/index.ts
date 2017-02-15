import { ExpressEngine } from "kamboja-express"
import { HttpError, Kamboja } from "kamboja"
import "reflect-metadata"

let kamboja = new Kamboja(new ExpressEngine())
kamboja.init().listen(5000)