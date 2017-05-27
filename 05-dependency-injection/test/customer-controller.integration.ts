import * as Supertest from "supertest"
import * as Chai from "chai"
import { app } from "../src/app"
import * as Mongoose from "mongoose"
import { MongooseHelper } from "kamboja-mongoose"
import {CustomerModel} from "../src/model/customer-model"

const CustomerOdm = MongooseHelper.getInstance()
    .createModel<CustomerModel>("Customer")

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

        it("Should return 400 if empty data provided", async () => {
            let id: string = "";
            await Supertest(app)
                .post("/customers")
                .expect(400)
            //make sure no data were added
            let result = await CustomerOdm.find();
            Chai.expect(result.length).eq(0)
        })

        it("Should return 400 if provided malformed json", async () => {
            let id: string = "";
            await Supertest(app)
                .post("/customers")
                .type("application/json")
                .send(`{ "email": "nobita-nobi@gmail.com", "name": "Nobita`)
                .expect((response: Supertest.Response) => {
                    Chai.expect(response.body).eq("Unexpected end of JSON input")
                })
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

        it("Should return 400 if provided invalid customer id", async () => {
            let customer = await new CustomerOdm({ email: "nobita-nobi@gmail.com", name: "Nobita" }).save()
            await Supertest(app)
                .get(`/customers/notvalid-id`)
                .expect((response: Supertest.Response) => {
                    Chai.expect(response.body[0].message).eq("[id] is not valid")
                })
                .expect(400)
        })
    })

    describe("Delete customer", () => {
        it("Should delete customer properly", async () => {
            let customer = await new CustomerOdm({ email: "nobita-nobi@gmail.com", name: "Nobita" }).save()
            await Supertest(app)
                .delete(`/customers/${customer._id}`)
                .expect((response: Supertest.Response) => {
                    Chai.expect(response.body.email).eq("nobita-nobi@gmail.com")
                    Chai.expect(response.body.name).eq("Nobita")
                })
                .expect(200)
            //make sure no data left
            let result = await CustomerOdm.find();
            Chai.expect(result.length).eq(0)
        })

        it("Should return 400 if provided invalid customer id", async () => {
            let customer = await new CustomerOdm({ email: "nobita-nobi@gmail.com", name: "Nobita" }).save()
            await Supertest(app)
                .delete(`/customers/notvalid-id`)
                .expect((response: Supertest.Response) => {
                    Chai.expect(response.body[0].message).eq("[id] is not valid")
                })
                .expect(400)
        })
    })

    describe("Modify customer", () => {
        it("Should modify customer properly", async () => {
            let customer = await new CustomerOdm({ email: "nobita-nobi@gmail.com", name: "Nobita" }).save()
            await Supertest(app)
                .patch(`/customers/${customer._id}`)
                .send({ name: "Suneo" })
                .expect((response: Supertest.Response) => {
                    Chai.expect(response.body.email).eq("nobita-nobi@gmail.com")
                    Chai.expect(response.body.name).eq("Nobita")
                })
                .expect(200)
            let result = await CustomerOdm.findById(customer._id);
            Chai.expect(result.name).eq("Suneo")
        })

        it("Should return 400 if provided invalid customer id", async () => {
            let customer = await new CustomerOdm({ email: "nobita-nobi@gmail.com", name: "Nobita" }).save()
            await Supertest(app)
                .patch(`/customers/notvalid-id`)
                .expect((response: Supertest.Response) => {
                    Chai.expect(response.body[0].message).eq("[id] is not valid")
                })
                .expect(400)
        })
    })

    describe("Replace customer", () => {
        it("Should replace customer properly", async () => {
            let customer = await new CustomerOdm({ email: "nobita-nobi@gmail.com", name: "Nobita" }).save()
            await Supertest(app)
                .put(`/customers/${customer._id}`)
                .send({ email: "suneo123@gmail.com", name: "Suneo" })
                .expect(200)
            let result = await CustomerOdm.findById(customer._id);
            Chai.expect(result.email).eq("suneo123@gmail.com")
            Chai.expect(result.name).eq("Suneo")
        })

        it("Should return 400 if provided invalid email", async () => {
            let customer = await new CustomerOdm({ email: "nobita-nobi@gmail.com", name: "Nobita" }).save()
            await Supertest(app)
                .put(`/customers/${customer._id}`)
                .send({ email: "suneo123", name: "Suneo" })
                .expect((response: Supertest.Response) => {
                    Chai.expect(response.body[0].message).eq("[email] is not a valid email address")
                })
                .expect(400)
        })

        it("Should return 400 if provided invalid customer id", async () => {
            let customer = await new CustomerOdm({ email: "nobita-nobi@gmail.com", name: "Nobita" }).save()
            await Supertest(app)
                .put(`/customers/23-id`)
                .expect((response: Supertest.Response) => {
                    Chai.expect(response.body[0].message).eq("[id] is not valid")
                })
                .expect(400)
        })
    })
})