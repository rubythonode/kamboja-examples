import * as Supertest from "supertest"
import * as Chai from "chai"
import { app } from "../src/app"
import { CustomerOdm } from "../src/model/customer-model"
import { PetOdm } from "../src/model/pet-model"
import * as Mongoose from "mongoose"

describe("Customer Pet Controller Integration", () => {
    let customerId: string;
    before(async () => {
        (<any>Mongoose).Promise = global.Promise
        await Mongoose.connect("mongodb://localhost/test-data")
        let customer = await new CustomerOdm({ email: "nobita-nobi@gmail.com", name: "Nobita" }).save()
        customerId = (<Mongoose.Types.ObjectId>customer._id).toHexString()
    })

    after(() => Mongoose.disconnect())

    beforeEach(async () => {
        await PetOdm.remove({})
    })

    describe("Add Pet", () => {
        it("Should add pet properly", async () => {
            let id: string = "";
            await Supertest(app)
                .post(`/customers/${customerId}/pets`)
                .send({ name: "Mimi", age: 4 })
                .expect((response: Supertest.Response) => {
                    id = response.body._id
                })
                .expect(200)

            //check if data added properly
            let customer = await PetOdm.findById(id)
            Chai.expect(customer.name).eq("Mimi")
            Chai.expect(customer.age).eq(4)
        })

    })

    describe("Get pet", () => {
        it("Should get pet properly", async () => {
            let pet = await new PetOdm({ name: "Mimi", age: 4 }).save()
            await Supertest(app)
                .get(`/customers/${customerId}/pets/${pet._id}`)
                .expect((response: Supertest.Response) => {
                    Chai.expect(response.body.name).eq("Mimi")
                    Chai.expect(response.body.age).eq(4)
                })
                .expect(200)
        })

    })

    describe("Delete pet", () => {
        it("Should delete pet properly", async () => {
            let pet = await new PetOdm({ name: "Mimi", age: 4 }).save()
            await Supertest(app)
                .delete(`/customers/${customerId}/pets/${pet._id}`)
                .expect(200)
            //make sure no data left
            let result = await PetOdm.find();
            Chai.expect(result.length).eq(0)
        })

    })

    describe("Modify pet", () => {
        it("Should modify pet properly", async () => {
            let pet = await new PetOdm({ name: "Mimi", age: 4 }).save()
            await Supertest(app)
                .patch(`/customers/${customerId}/pets/${pet._id}`)
                .send({ name: "Tango" })
                .expect(200)
            let result = await PetOdm.findById(pet._id);
            Chai.expect(result.name).eq("Tango")
        })

    })

    describe("Replace pet", () => {
        it("Should replace pet properly", async () => {
            let pet = await new PetOdm({ name: "Mimi", age: 4 }).save()
            await Supertest(app)
                .put(`/customers/${customerId}/pets/${pet._id}`)
                .send({ name: "Tango", age: 3 })
                .expect(200)
            let result = await PetOdm.findById(pet._id);
            Chai.expect(result.age).eq(3)
            Chai.expect(result.name).eq("Tango")
        })

    })
})