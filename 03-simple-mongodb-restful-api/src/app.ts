import { KambojaApplication } from "kamboja-express"
import * as BodyParser from "body-parser"

export const app = new KambojaApplication(__dirname)
    .use(BodyParser.json())
    .init()