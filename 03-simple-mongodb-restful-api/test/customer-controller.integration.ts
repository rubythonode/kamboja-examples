import * as Supertest from "supertest"
import * as Chai from "chai"
import { app } from "../src/app"
import { CustomerOdm } from "../src/model/customer-model"
import * as Mongoose from "mongoose"

/**
 * This tests intended to test the functionalities of KambojaJS
 * you don't need to include these tests in your application because 
 * KambojaJS has covered all these functionalities
 */

describe("Customer Controller Integration", () => {
    before(() => {
        (<any>Mongoose).Promise = global.Promise
        Mongoose.connect("mongodb://localhost/test-data")
    })

    after(() => Mongoose.disconnect())

    beforeEach(async () => {
        await CustomerOdm.remove({})
    })

    describe("Add Customer", () => {
        it("Should add customer properly", async () => {
            let id: string = "";
            await Supertest(app)
                .post("/customers")
                .send({ email: "nobita-nobi@gmail.com", name: "Nobita" })
                .expect((response: Supertest.Response) => {
                    id = response.body._id
                })
                .expect(200)

            //check if data added properly
            let customer = await CustomerOdm.findById(id)
            Chai.expect(customer.email).eq("nobita-nobi@gmail.com")
            Chai.expect(customer.name).eq("Nobita")
        })

        it("Should return 400 empty data provided", async () => {
            let id: string = "";
            await Supertest(app)
                .post("/customers")
                .expect(400)
            //make sure no data were added
            let result = await CustomerOdm.find();
            Chai.expect(result.length).eq(0)
        })

        it("Should return 400 if invalid email provided", async () => {
            let id: string = "";
            await Supertest(app)
                .post("/customers")
                .send({ email: "nobita-nobi", name: "Nobita" })
                .expect((response: Supertest.Response) => {
                    Chai.expect(response.body[0].message).eq("[email] is not a valid email address")
                })
                .expect(400)
            //make sure no data were added
            let result = await CustomerOdm.find();
            Chai.expect(result.length).eq(0)
        })

        it("Should return 400 if email is empty", async () => {
            let id: string = "";
            await Supertest(app)
                .post("/customers")
                .send({ name: "Nobita" })
                .expect((response: Supertest.Response) => {
                    Chai.expect(response.body[0].message).eq("[email] is required")
                })
                .expect(400)
            //make sure no data were added
            let result = await CustomerOdm.find();
            Chai.expect(result.length).eq(0)
        })

        it("Should return 400 if name is empty", async () => {
            let id: string = "";
            await Supertest(app)
                .post("/customers")
                .send({ email: "nobita-nobi@gmail.com" })
                .expect((response: Supertest.Response) => {
                    Chai.expect(response.body[0].message).eq("[name] is required")
                })
                .expect(400)
            //make sure no data were added
            let result = await CustomerOdm.find();
            Chai.expect(result.length).eq(0)
        })
    })

    describe("Get customer", () => {
        it("Should get customer properly", async () => {
            let customer = await new CustomerOdm({ email: "nobita-nobi@gmail.com", name: "Nobita" }).save()
            await Supertest(app)
                .get(`/customers/${customer._id}`)
                .expect((response: Supertest.Response) => {
                    Chai.expect(response.body.email).eq("nobita-nobi@gmail.com")
                    Chai.expect(response.body.name).eq("Nobita")
                })
                .expect(200)
        })

        it.only("Should return 400 if provided invalid customer id", async () => {
            let customer = await new CustomerOdm({ email: "nobita-nobi@gmail.com", name: "Nobita" }).save()
            await Supertest(app)
                .get(`/customers/not-valid-id`)
                .expect((response: Supertest.Response) => {
                    console.log(response.text)
                })
                .expect(400)
        })
    })

})