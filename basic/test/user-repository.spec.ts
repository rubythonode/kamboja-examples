import { UserRepository } from "../app/repository/user-repository"
import { UserModel } from "../app/model/user-model"
import * as Chai from "chai"

describe("UserRepository", () => {
    it("Should add and retrieve user properly", async () => {
        let repo = new UserRepository();
        repo.add({ email: "nobi@domain.com", displayName: "Nobi Nobita" })
        let user = await repo.get("nobi@domain.com")
        Chai.expect(user).deep.eq({ email: "nobi@domain.com", displayName: "Nobi Nobita" })
    })

    it("Should able to retrive all users", async () => {
        let repo = new UserRepository();
        repo.add({ email: "nobi@domain.com", displayName: "Nobi Nobita" })
        repo.add({ email: "sizuka@domain.com", displayName: "Sizuka Nobi" })
        let users = await repo.getAll()
        Chai.expect(users).deep.eq([
            { email: "nobi@domain.com", displayName: "Nobi Nobita" },
            { email: "sizuka@domain.com", displayName: "Sizuka Nobi" }
        ])
    })

    it("Should able to delete user", async () => {
        let repo = new UserRepository();
        repo.add({ email: "nobi@domain.com", displayName: "Nobi Nobita" })
        repo.add({ email: "sizuka@domain.com", displayName: "Sizuka Nobi" })
        await repo.delete("nobi@domain.com")
        let users = await repo.getAll()
        Chai.expect(users).deep.eq([
            { email: "sizuka@domain.com", displayName: "Sizuka Nobi" }
        ])
    })

    it("Should able to update user", async () => {
        let repo = new UserRepository();
        repo.add({ email: "sizuka@domain.com", displayName: "Sizuka Nobi" })
        await repo.modify("sizuka@domain.com", <UserModel>{ displayName: "Giant" })
        let users = await repo.getAll()
        Chai.expect(users).deep.eq([
            { email: "sizuka@domain.com", displayName: "Giant" }
        ])
    })

    it("Should able clear users", async () => {
        let repo = new UserRepository();
        repo.add({ email: "nobi@domain.com", displayName: "Nobi Nobita" })
        repo.add({ email: "sizuka@domain.com", displayName: "Sizuka Nobi" })
        await repo.clear()
        let users = await repo.getAll()
        Chai.expect(users).deep.eq([])
    })
})
