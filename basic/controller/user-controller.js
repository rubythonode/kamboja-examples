"use strict";
var tslib_1 = require("tslib");
var kamboja_1 = require("kamboja");
var user_model_1 = require("../model/user-model");
var user_repository_1 = require("../repository/user-repository");
var UserController = (function (_super) {
    tslib_1.__extends(UserController, _super);
    function UserController() {
        var _this = _super.call(this) || this;
        _this.repository = user_repository_1.UserRepository.instance;
        return _this;
    }
    UserController.prototype.getByPage = function (offset, take) {
        return this.repository.getAll();
    };
    UserController.prototype.get = function (email) {
        return this.repository.get(email);
    };
    UserController.prototype.add = function (data) {
        if (this.validator.isValid()) {
            try {
                this.repository.add(data);
                return { success: true };
            }
            catch (e) {
                throw new Error("Unable to save user");
            }
        }
        else {
            return this.validator.getValidationErrors();
        }
    };
    UserController.prototype.modify = function (email, data) {
        if (this.validator.isValid()) {
            try {
                this.repository.modify(email, data);
                return { success: true };
            }
            catch (e) {
                throw new Error("Unable to save user");
            }
        }
    };
    UserController.prototype.delete = function (email) {
        try {
            this.repository.delete(email);
            return { success: true };
        }
        catch (e) {
            throw new Error("Unable to delete user");
        }
    };
    return UserController;
}(kamboja_1.ApiController));
tslib_1.__decorate([
    tslib_1.__param(0, kamboja_1.val.type("UserModel, model/user-model")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [user_model_1.UserModel]),
    tslib_1.__metadata("design:returntype", void 0)
], UserController.prototype, "add", null);
tslib_1.__decorate([
    tslib_1.__param(1, kamboja_1.val.type("DisplayNameModel, model/user-model")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, user_model_1.DisplayNameModel]),
    tslib_1.__metadata("design:returntype", void 0)
], UserController.prototype, "modify", null);
exports.UserController = UserController;
