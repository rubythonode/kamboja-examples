import { container } from "../src/plumbing"
import { CustomerService } from "../src/service/customer-service"
import { PetService } from "../src/service/pet-service"
import { CustomersController } from "../src/controller/customers-controller"
import { CustomersPetsController } from "../src/controller/customers-pets-controller"
import * as Chai from "chai"

describe("Inversify Container Tests", () => {
    it("Should resolve customers controller properly", () => {
        let controller = container.get<CustomersController>("CustomersController, controller/customers-controller")
        Chai.expect(controller instanceof CustomersController).true
    })

    it("Should resolve customers pets controller properly", () => {
        let controller = container.get<CustomersPetsController>("CustomersPetsController, controller/customers-pets-controller")
        Chai.expect(controller instanceof CustomersPetsController).true
    })
})