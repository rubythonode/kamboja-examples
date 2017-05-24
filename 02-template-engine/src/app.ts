import { KambojaApplication } from "kamboja-express"
import * as Path from "path"
import * as Express from "express"
import * as Morgan from "morgan"
import { ErrorHandler } from "./middleware/error-handler"

const app = new KambojaApplication(__dirname)
    .set("views", Path.join(__dirname, "view"))
    .set("view engine", "pug")
    .use(Morgan("dev"))
    .use(Express.static(Path.join(__dirname, "../www")))
    .use(new ErrorHandler())
    .init()

app.listen(5000)
console.log("Ready http://localhost:5000")