import {Core, JsonActionResult} from "kamboja-express"

export class ErrorHandler implements Core.Middleware{
    async execute(request:Core.HttpRequest, next:Core.Invocation){
        try{
            return await next.proceed()
        }
        catch(e){
            console.log(e)
            return new JsonActionResult(e.message, e.status || 500)
        }
    }
}