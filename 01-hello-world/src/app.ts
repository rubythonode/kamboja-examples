import { KambojaApplication } from "kamboja-express"

const app = new KambojaApplication(__dirname).init()

app.listen(5000)
console.log("Ready http://localhost:5000")