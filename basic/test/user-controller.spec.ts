import { UserController } from "../app/controller/user-controller"
import { UserModel } from "../app/model/user-model"
import { UserRepository } from "../app/repository/user-repository"
import { Validator } from "kamboja"
import * as Chai from "chai"


describe("UserController", () => {

    beforeEach(async () => {
        //repository used in controller is singleton
        //to get the test work correctly we should clear the data
        //on each tests
        await UserRepository.instance.clear();
    })

    it("Should add and retrieve user properly", async () => {
        let repo = new UserController();
        repo.add({ email: "nobi@domain.com", displayName: "Nobi Nobita" })
        let user = await repo.get("nobi@domain.com")
        Chai.expect(user).deep.eq({ email: "nobi@domain.com", displayName: "Nobi Nobita" })
    })

    it("Should able to retrive all users", async () => {
        let repo = new UserController();
        repo.add({ email: "nobi@domain.com", displayName: "Nobi Nobita" })
        repo.add({ email: "sizuka@domain.com", displayName: "Sizuka Nobi" })
        let users = await repo.getByPage(1, 10)
        Chai.expect(users).deep.eq([
            { email: "nobi@domain.com", displayName: "Nobi Nobita" },
            { email: "sizuka@domain.com", displayName: "Sizuka Nobi" }
        ])
    })

    it("Should able to delete user", async () => {
        let repo = new UserController();
        repo.add({ email: "nobi@domain.com", displayName: "Nobi Nobita" })
        repo.add({ email: "sizuka@domain.com", displayName: "Sizuka Nobi" })
        await repo.delete("nobi@domain.com")
        let users = await repo.getByPage(1, 10)
        Chai.expect(users).deep.eq([
            { email: "sizuka@domain.com", displayName: "Sizuka Nobi" }
        ])
    })

    it("Should able to update user", async () => {
        let repo = new UserController();
        repo.add({ email: "sizuka@domain.com", displayName: "Sizuka Nobi" })
        await repo.modify("sizuka@domain.com", { displayName: "Giant" })
        let users = await repo.getByPage(1, 10)
        Chai.expect(users).deep.eq([
            { email: "sizuka@domain.com", displayName: "Giant" }
        ])
    })
})
