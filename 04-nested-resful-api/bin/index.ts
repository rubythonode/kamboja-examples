import { app } from "../src/app"
import * as Mongoose from "mongoose"

(<any>Mongoose).Promise = global.Promise
Mongoose.connect("mongodb://localhost/simple-restful-api")
    .catch(e => console.log(e))

app.listen(5000)
console.log("http://localhost:5000")