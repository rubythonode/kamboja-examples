import { KambojaApplication } from "kamboja-express"
import * as BodyParser from "body-parser"
import * as Mongoose from "mongoose"

Mongoose.connect("mongodb://localhost/simple-restful-api").catch(e => console.log(e))

const app = new KambojaApplication(__dirname)
    .use(BodyParser.json())
    .init()

app.listen(5000)
console.log("Ready http://localhost:5000")