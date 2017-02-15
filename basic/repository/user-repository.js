"use strict";
var tslib_1 = require("tslib");
var Lodash = require("lodash");
function delay(ms) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, ms);
    });
}
var UserRepository = (function () {
    function UserRepository() {
        this.users = [];
    }
    UserRepository.prototype.add = function (user) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, delay(20)];
                    case 1:
                        _a.sent();
                        this.users.push(user);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserRepository.prototype.modify = function (email, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var user;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, delay(20)];
                    case 1:
                        _a.sent();
                        user = this.users.filter(function (x) { return x.email == email; })[0];
                        user.displayName = data.displayName;
                        return [2 /*return*/];
                }
            });
        });
    };
    UserRepository.prototype.delete = function (email) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, delay(20)];
                    case 1:
                        _a.sent();
                        Lodash.remove(this.users, function (x) { return x.email == email; });
                        return [2 /*return*/];
                }
            });
        });
    };
    UserRepository.prototype.get = function (email) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, delay(20)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.users.filter(function (x) { return x.email == email; })[0]];
                }
            });
        });
    };
    UserRepository.prototype.getAll = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, delay(20)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.users];
                }
            });
        });
    };
    UserRepository.prototype.clear = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, delay(20)];
                    case 1:
                        _a.sent();
                        this.users = [];
                        return [2 /*return*/];
                }
            });
        });
    };
    return UserRepository;
}());
UserRepository.instance = new UserRepository();
exports.UserRepository = UserRepository;
