"use strict";
var _this = this;
var tslib_1 = require("tslib");
var Chai = require("chai");
var kamboja_1 = require("kamboja");
var kamboja_express_1 = require("kamboja-express");
var Supertest = require("supertest");
describe.only("Integration Test", function () {
    var app;
    beforeEach(function () {
        var kamboja = new kamboja_1.Kamboja(new kamboja_express_1.ExpressEngine(), {
            errorHandler: function (error) {
                console.log(error.error);
                //error.response.error(error.error)
            }
        });
        app = kamboja.init();
    });
    it("Should add user properly", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, Supertest(app)
                    .post("/user")
                    .send({ email: "nobi@domain.com", displayName: "Nobita Nobi" })
                    .expect(function (result) {
                    Chai.expect(result.body).deep.eq({ success: true });
                })
                    .expect(200)];
        });
    }); });
    it("Should get user properly", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, Supertest(app)
                    .get("/user/nobi@domain.com")
                    .expect(function (result) {
                    Chai.expect(result.body).deep
                        .eq({ email: "nobi@domain.com", displayName: "Nobita Nobi" });
                })
                    .expect(200)];
        });
    }); });
    it("Should modify user properly", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, Supertest(app)
                    .put("/user/nobi@domain.com")
                    .send({ displayName: "Nobita Nobi Japan" })
                    .expect(function (result) {
                    Chai.expect(result.body).deep.eq({ success: true });
                })
                    .expect(200)];
        });
    }); });
    it("Should validate parameter properly", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, Supertest(app)
                    .post("/user")
                    .send({ email: "not-an-email", displayName: "Nobita Nobi" })
                    .expect(function (result) {
                    Chai.expect(result.body).deep.eq([{
                            field: 'data.email',
                            message: '[email] is not a valid email address'
                        }]);
                })
                    .expect(200)];
        });
    }); });
});
