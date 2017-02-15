"use strict";
var _this = this;
var tslib_1 = require("tslib");
var user_controller_1 = require("../controller/user-controller");
var user_repository_1 = require("../repository/user-repository");
var Chai = require("chai");
//use fake validator so the .validator.isValid() inside controller
//will always return true
//use sinon spy/stub for complex logic
var validator = {
    isValid: function () { return true; },
    getValidationErrors: function () { return []; }
};
describe("UserController", function () {
    beforeEach(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                //repository used in controller is singleton
                //to get the test work correctly we should clear the data
                //on each tests
                return [4 /*yield*/, user_repository_1.UserRepository.instance.clear()];
                case 1:
                    //repository used in controller is singleton
                    //to get the test work correctly we should clear the data
                    //on each tests
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should add and retrieve user properly", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var repo, user;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    repo = new user_controller_1.UserController();
                    repo.validator = validator;
                    repo.add({ email: "nobi@domain.com", displayName: "Nobi Nobita" });
                    return [4 /*yield*/, repo.get("nobi@domain.com")];
                case 1:
                    user = _a.sent();
                    Chai.expect(user).deep.eq({ email: "nobi@domain.com", displayName: "Nobi Nobita" });
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should able to retrive all users", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var repo, users;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    repo = new user_controller_1.UserController();
                    repo.validator = validator;
                    repo.add({ email: "nobi@domain.com", displayName: "Nobi Nobita" });
                    repo.add({ email: "sizuka@domain.com", displayName: "Sizuka Nobi" });
                    return [4 /*yield*/, repo.getByPage(1, 10)];
                case 1:
                    users = _a.sent();
                    Chai.expect(users).deep.eq([
                        { email: "nobi@domain.com", displayName: "Nobi Nobita" },
                        { email: "sizuka@domain.com", displayName: "Sizuka Nobi" }
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should able to delete user", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var repo, users;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    repo = new user_controller_1.UserController();
                    repo.validator = validator;
                    repo.add({ email: "nobi@domain.com", displayName: "Nobi Nobita" });
                    repo.add({ email: "sizuka@domain.com", displayName: "Sizuka Nobi" });
                    return [4 /*yield*/, repo.delete("nobi@domain.com")];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, repo.getByPage(1, 10)];
                case 2:
                    users = _a.sent();
                    Chai.expect(users).deep.eq([
                        { email: "sizuka@domain.com", displayName: "Sizuka Nobi" }
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should able to update user", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var repo, users;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    repo = new user_controller_1.UserController();
                    repo.validator = validator;
                    repo.add({ email: "sizuka@domain.com", displayName: "Sizuka Nobi" });
                    return [4 /*yield*/, repo.modify("sizuka@domain.com", { displayName: "Giant" })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, repo.getByPage(1, 10)];
                case 2:
                    users = _a.sent();
                    Chai.expect(users).deep.eq([
                        { email: "sizuka@domain.com", displayName: "Giant" }
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
});
