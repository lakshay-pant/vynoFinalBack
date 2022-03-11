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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const update_admin_dto_1 = require("./dto/update-admin.dto");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
let AdminController = class AdminController {
    constructor(adminService, jwtService, usersService) {
        this.adminService = adminService;
        this.jwtService = jwtService;
        this.usersService = usersService;
    }
    async create(body) {
        if (!body.hasOwnProperty('user_name') || !body.hasOwnProperty('password')) {
            return { status: false, message: "provide Valid parameter" };
        }
        else if (body['user_name'] == 'admin@vyno.com' && body['password'] == '!@#$%^') {
            const payload = { user_name: 'admin@vyno.com' };
            const jwtToken = await this.jwtService.signAsync(payload);
            return { status: true, token: jwtToken, message: "login successfully" };
        }
        else {
            return { status: false, message: "login failed" };
        }
    }
    async findAll() {
        return await this.usersService.findAll();
    }
    async findOne(query, body) {
        try {
            const status = ["pending", "approved", "rejected"];
            if (query.id && body.account_status) {
                if (status.includes(body.account_status)) {
                    const finduser = await this.usersService.findDataFromId(query.id);
                    const documentStatus = {
                        'account_status': body.account_status
                    };
                    var updateStatus = await this.usersService.update(query.id, documentStatus);
                    if (updateStatus) {
                        return { status: true, message: "status change successfully" };
                    }
                }
                else {
                    return { status: false, message: `your status doesn't match our records` };
                }
            }
            else {
                return { status: false, message: "provide Valid parameter" };
            }
        }
        catch (e) {
            return { status: false, message: e };
        }
    }
    update(id, updateAdminDto) {
        return this.adminService.update(+id, updateAdminDto);
    }
    remove(id) {
        return this.adminService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('get-user'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('update-account-status'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_admin_dto_1.UpdateAdminDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "remove", null);
AdminController = __decorate([
    (0, common_1.Controller)({ path: 'admin', version: '1' }),
    __metadata("design:paramtypes", [admin_service_1.AdminService,
        jwt_1.JwtService,
        users_service_1.UsersService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map