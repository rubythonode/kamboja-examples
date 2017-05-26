import {Core, ViewActionResult} from "kamboja-express"

export class ErrorHandler implements Core.Middleware{
    async execute(request:Core.HttpRequest, next:Core.Invocation){
        try{
            return await next.proceed()
        }
        catch(e){
            return new ViewActionResult({ message: e.message, stack: e.stack}, "_shared/error")
        }
    }
}