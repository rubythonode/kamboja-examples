import * as Chai from "chai"
import { Kamboja, HttpError } from "kamboja"
import { ExpressEngine } from "kamboja-express"
import * as Express from "express"
import * as Supertest from "supertest"
import { UserRepository } from "../app/repository/user-repository"

describe("Integration Test", () => {
    let app: Express.Application;
    beforeEach(() => {
        let kamboja = new Kamboja(new ExpressEngine(), {
            controllerPaths: ["app/controller"],
            modelPath: "app/model",
            viewPath: "app/view",
            errorHandler: (error: HttpError) => {
                console.log(error.error)
                //error.response.error(error.error)
            },
        })
        app = kamboja.init()
        UserRepository.instance.clear()
    })

    it("Should add/get user properly", async () => {
        await Supertest(app)
            .post("/user")
            .send({ email: "nobi@domain.com", displayName: "Nobita Nobi" })
            .expect(200)

        await Supertest(app)
            .get("/user/nobi@domain.com")
            .expect((result) => {
                Chai.expect(result.body).deep
                    .eq({ email: "nobi@domain.com", displayName: "Nobita Nobi" })
            })
            .expect(200)
    })

    it("Should modify user properly", async () => {
        await Supertest(app)
            .post("/user")
            .send({ email: "nobi@domain.com", displayName: "Nobita Nobi" })
            .expect(200)

        await Supertest(app)
            .patch("/user/nobi@domain.com")
            .send({ displayName: "Nobita Nobi Japan" })
            .expect(200)

        await Supertest(app)
            .get("/user/nobi@domain.com")
            .expect((result) => {
                Chai.expect(result.body).deep
                    .eq({ email: "nobi@domain.com", displayName: "Nobita Nobi Japan" })
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
            .expect(400)
    })

    it("Should delete user properly", async () => {
        await Supertest(app)
            .post("/user")
            .send({ email: "nobi@domain.com", displayName: "Nobita Nobi" })
            .expect(200)

        await Supertest(app)
            .delete("/user/nobi@domain.com")
            .expect(200)

        await Supertest(app)
            .get("/user/nobi@domain.com")
            .expect((result) => {
                Chai.expect(result.body).deep
                    .eq({})
            })
            .expect(200)
    })
})
