import { Controller, http, ViewActionResult } from "kamboja-express"

export class HomeController extends Controller {
    @http.get("/")
    index() {
        return new ViewActionResult({ title: "Hello KambojaJS!" })
    }

    testError() {
        //this action simulate an error
        //we usually forgot to check for null value on the request.user
        return new ViewActionResult({ message: this.request.user.displayName })
    }
}