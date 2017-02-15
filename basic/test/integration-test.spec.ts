import * as Chai from "chai"
import { Kamboja, HttpError } from "kamboja"
import { ExpressEngine } from "kamboja-express"
import * as Express from "express"
import * as Supertest from "supertest"

describe.only("Integration Test", () => {
    let app: Express.Application;
    beforeEach(() => {
        let kamboja = new Kamboja(new ExpressEngine(), {
            errorHandler: (error: HttpError) => {
                console.log(error.error)
                //error.response.error(error.error)
            }
        })
        app = kamboja.init()
    })

    it("Should add user properly", async () => {
        return Supertest(app)
            .post("/user")
            .send({ email: "nobi@domain.com", displayName: "Nobita Nobi" })
            .expect((result) => {
                Chai.expect(result.body).deep.eq({ success: true })
            })
            .expect(200)
    })

    it("Should get user properly", async () => {
        return Supertest(app)
            .get("/user/nobi@domain.com")

            .expect((result) => {
                Chai.expect(result.body).deep
                    .eq({ email: "nobi@domain.com", displayName: "Nobita Nobi" })
            })
            .expect(200)
    })

    it("Should modify user properly", async () => {
        return Supertest(app)
            .put("/user/nobi@domain.com")
            .send({ displayName: "Nobita Nobi Japan" })
            .expect((result) => {
                Chai.expect(result.body).deep.eq({ success: true })
            })
            .expect(200)
    })

    it("Should validate parameter properly", async () => {
        return Supertest(app)
            .post("/user")
            .send({ email: "not-an-email", displayName: "Nobita Nobi" })
            .expect((result) => {
                Chai.expect(result.body).deep.eq([{
                    field: 'data.email',
                    message: '[email] is not a valid email address'
                }])
            })
            .expect(200)
    })

})
