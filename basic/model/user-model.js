"use strict";
var tslib_1 = require("tslib");
var kamboja_1 = require("kamboja");
var UserModel = (function () {
    function UserModel() {
    }
    return UserModel;
}());
tslib_1.__decorate([
    kamboja_1.val.email(),
    kamboja_1.val.required(),
    tslib_1.__metadata("design:type", String)
], UserModel.prototype, "email", void 0);
tslib_1.__decorate([
    kamboja_1.val.required(),
    tslib_1.__metadata("design:type", String)
], UserModel.prototype, "displayName", void 0);
exports.UserModel = UserModel;
var DisplayNameModel = (function () {
    function DisplayNameModel() {
    }
    return DisplayNameModel;
}());
tslib_1.__decorate([
    kamboja_1.val.required(),
    tslib_1.__metadata("design:type", String)
], DisplayNameModel.prototype, "displayName", void 0);
exports.DisplayNameModel = DisplayNameModel;
