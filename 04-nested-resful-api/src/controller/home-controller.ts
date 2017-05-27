import { Controller, http } from "kamboja-express"

export class HomeController extends Controller {
    @http.get("/")
    index() {
        return "Simple Restful API with KambojaJS"
    }
}