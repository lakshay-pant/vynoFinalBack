"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const update_user_dto_1 = require("./dto/update-user.dto");
const helper_1 = require("../common/helper");
const moment = require("moment");
const jwt_1 = require("@nestjs/jwt");
const mime = require('mime');
var mongoose = require('mongoose');
let UsersController = class UsersController {
    constructor(usersService, jwtService, helperService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.helperService = helperService;
    }
    findAll() {
        return this.usersService.findAll();
    }
    async accountStatus(body) {
        const id = body.user.id;
        const finduser = await this.usersService.findDataFromId(id);
        if (finduser && finduser['account_status']) {
            return { status: true, data: { account_status: finduser['account_status'] } };
        }
        else {
            return { "status": true, data: { account_status: '' } };
        }
    }
    async myProfile(body) {
        const id = body.user.id;
        const finduser = await this.usersService.findDataFromId(id);
        if (finduser) {
            return { status: true, data: finduser };
        }
        else {
            return { "status": false, message: "User not found" };
        }
    }
    async updateUser(updateUserDto) {
        try {
            if (updateUserDto.hasOwnProperty('profile')) {
                var imgBase64 = updateUserDto['profile'];
                const uploadfile = this.helperService.base64ImageUpload(imgBase64);
                if (uploadfile.status != true) {
                    return { status: true, message: "invalid format of images" };
                }
                else {
                    updateUserDto['profile'] = uploadfile.path;
                }
            }
            const id = updateUserDto['user'].id;
            delete updateUserDto['user'];
            delete updateUserDto['otp'];
            delete updateUserDto['phone_number'];
            delete updateUserDto['account_verify'];
            const updateUser = await this.usersService.update(id, updateUserDto);
            if (updateUser) {
                const finduser = await this.usersService.findDataFromId(id);
                return { status: true, message: "updated successfully", data: { profile: finduser['profile'] } };
            }
            else {
                return { status: true, message: "User not found" };
            }
        }
        catch (e) {
            return { "status": false, message: e };
        }
    }
    async ratingReview(body) {
        try {
            var user_id = body.user.id;
            var to = body.to;
            var rating = body.rating;
            var rating_for = body.rating_for;
            var action = ["user", "driver"];
            body['created_at'] = moment().format('DD/MM/YYYY h:mm A');
            delete body.user;
            if (!to || !rating || !action.includes(rating_for)) {
                return { "status": false, message: 'provide valid parameter' };
            }
            else {
                const finduser = await this.usersService.review(body);
                if (finduser) {
                    return { status: true, message: "successfully" };
                }
                else {
                    return { status: true, message: "went somthing wrong" };
                }
            }
        }
        catch (e) {
            return { "status": false, message: e };
        }
    }
    async myWallet(body, roles) {
        const user_id = body.user.id;
        const finddata = await this.usersService.findDataFromId(user_id);
        if (finddata) {
            return { "status": true, wallet_user: finddata['wallet_amount_user'], wallet_driver: finddata['wallet_amount_driver'] };
        }
    }
};
__decorate([
    (0, common_1.Get)('allUser'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('account-status'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "accountStatus", null);
__decorate([
    (0, common_1.Get)('my-profile'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "myProfile", null);
__decorate([
    (0, common_1.Post)('/update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Post)('/ratingReview'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "ratingReview", null);
__decorate([
    (0, common_1.Get)('my-wallet'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "myWallet", null);
UsersController = __decorate([
    (0, common_1.Controller)({ path: 'user', version: '1' }),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        helper_1.HelperService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map