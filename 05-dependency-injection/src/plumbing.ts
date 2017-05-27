import {Controller, ApiController} from "kamboja-express"
import { Container, injectable, decorate } from "inversify"
import { CustomerService } from "./service/customer-service"
import { PetService } from "./service/pet-service"
import { CustomersController } from "./controller/customers-controller"
import { CustomersPetsController } from "./controller/customers-pets-controller"

const container = new Container()

decorate(injectable(), Controller)
decorate(injectable(), ApiController)

container.bind("CustomerService, service/customer-service")
    .to(CustomerService)
container.bind("PetService, service/pet-service")
    .to(PetService)
container.bind("CustomersController, controller/customers-controller")
    .to(CustomersController)
container.bind("CustomersPetsController, controller/customers-pets-controller")
    .to(CustomersPetsController)

export {container}