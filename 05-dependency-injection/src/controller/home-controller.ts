import { Controller, http } from "kamboja-express"
import { injectable } from "inversify"

@injectable()
export class HomeController extends Controller {
    @http.get("/")
    index() {
        return "Simple Restful API with KambojaJS"
    }
}