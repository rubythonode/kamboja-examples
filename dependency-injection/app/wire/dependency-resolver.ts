import { DependencyResolver, ApiController, Controller } from "kamboja"
import { Container, decorate, injectable } from "inversify"
import { UserController } from "../controller/user-controller"
import { UserRepository } from "../repository/user-repository"

export class InversifyDependencyResolver implements DependencyResolver {
    container: Container
    constructor() {
        decorate(injectable(), ApiController)
        decorate(injectable(), UserRepository)
        this.container = new Container()
        this.container.bind("UserRepository, app/repository/user-repository")
            .to(UserRepository)
            .inSingletonScope()
        this.container.bind("UserController, app/controller/user-controller")
            .to(UserController)
    }

    resolve<T>(qualifiedClassName: string): any {
        return this.container.get(qualifiedClassName)
    }
}