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
exports.SingupController = void 0;
const common_1 = require("@nestjs/common");
const singup_service_1 = require("./singup.service");
const users_service_1 = require("../users/users.service");
const create_user_dto_1 = require("../users/dto/create-user.dto");
const helper_1 = require("../common/helper");
const uuid_1 = require("uuid");
const moment = require("moment");
const configuration_1 = require("./../../config/configuration");
let fetch = require('node-fetch');
const jwt_1 = require("@nestjs/jwt");
var mongoose = require('mongoose');
let SingupController = class SingupController {
    constructor(singupService, usersService, jwtService, helperService) {
        this.singupService = singupService;
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.helperService = helperService;
    }
    async create(createUserDto) {
        try {
            if (!createUserDto.hasOwnProperty('phone_number') || !createUserDto.hasOwnProperty('country_code')) {
                return { status: false, message: "provide Valid parameter" };
            }
            const checkUserExits = await this.usersService.findData({ phone_number: createUserDto['phone_number'], country_code: createUserDto['country_code'] });
            const date = moment().format('DD/MM/YYYY HH:mm:ss');
            if (checkUserExits) {
                createUserDto['updated_at'] = date;
                var updateUser = await this.usersService.updateOtp(createUserDto);
                updateUser = JSON.parse(JSON.stringify(updateUser));
                return { status: true, id: updateUser._id, message: "user updated successfully" };
            }
            else {
                createUserDto['first_name'] = '';
                createUserDto['last_name'] = '';
                createUserDto['email'] = '';
                createUserDto['gender'] = '';
                createUserDto['dob'] = '';
                createUserDto['profession'] = '';
                createUserDto['driving_licence'] = '';
                createUserDto['cni_number'] = '';
                createUserDto['created_at'] = date;
                createUserDto['updated_at'] = '';
                createUserDto['verify_otp'] = '1234';
                createUserDto['role'] = '1';
                createUserDto['account_verify'] = '';
                createUserDto['account_status'] = '';
                var createUser = await this.usersService.create(createUserDto);
                createUser = JSON.parse(JSON.stringify(createUser));
                if (createUser) {
                    var createMomoCredential = await this.createMomoAccountAndSaveCredential(createUser._id);
                    createMomoCredential = JSON.parse(JSON.stringify(createMomoCredential));
                    if (createMomoCredential['_id']) {
                        return { status: true, id: createUser._id, message: "user created successfully" };
                    }
                    else {
                        var deleteUser = await this.usersService.deleteUser(createUser._id);
                        return { status: false, message: configuration_1.ERR_MSG };
                    }
                }
            }
        }
        catch (e) {
            return { status: false, message: e };
        }
    }
    async createMomoAccountAndSaveCredential(user_id) {
        var url = configuration_1.MOMO.MOMO_URL + '/v1_0/apiuser';
        var uuidv4 = (0, uuid_1.v4)();
        var header = {
            'Content-Type': 'application/json', 'Ocp-Apim-Subscription-Key': configuration_1.MOMO.OcpApimSubscriptionKey,
            'X-Reference-Id': uuidv4
        };
        await fetch(url, {
            method: 'POST',
            headers: header,
            body: JSON.stringify({
                "providerCallbackHost": "string"
            })
        }).then(async (response) => {
            if (response.status == 201) {
                var url = configuration_1.MOMO.MOMO_URL + '/v1_0/apiuser/' + uuidv4 + '/apikey';
                var header = {
                    'Ocp-Apim-Subscription-Key': configuration_1.MOMO.OcpApimSubscriptionKey
                };
                const response = await fetch(url, {
                    method: 'POST',
                    headers: header
                }).then(async (responseData) => {
                    const content = await responseData.json();
                    const username = uuidv4;
                    const password = content.apiKey;
                    const data = {
                        'user_id': user_id,
                        'username': uuidv4,
                        'password': password,
                        'created_at': moment().format('DD/MM/YYYY h:mm A')
                    };
                    const createMomoCredential = await this.usersService.createMomoCredential(data);
                    return createMomoCredential;
                });
            }
        });
    }
    async verifyotp(req, res, data) {
        try {
            if (!data.hasOwnProperty('id') || !data.hasOwnProperty('otp')) {
                return { status: false, message: "provide Valid parameter" };
            }
            const verifyotp = await this.usersService.findData({ _id: mongoose.Types.ObjectId(data.id), verify_otp: data.otp });
            if (verifyotp) {
                const updatefcm = await this.usersService.update(data.id, { 'fcm': data.fcm });
                const payload = { id: data.id };
                const jwtToken = await this.jwtService.signAsync(payload);
                const userdata = this.helperService.removeUnderscoreFromcolumn(verifyotp);
                return { status: true, token: jwtToken, data: userdata, message: "otp verify successfully" };
            }
            else {
                return { status: false, message: "otp not match" };
            }
        }
        catch (err) {
            return { status: false, message: 'invalid token' };
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], SingupController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/verify-otp'),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], SingupController.prototype, "verifyotp", null);
SingupController = __decorate([
    (0, common_1.Controller)({ path: 'signup', version: '1' }),
    __metadata("design:paramtypes", [singup_service_1.SingupService,
        users_service_1.UsersService,
        jwt_1.JwtService,
        helper_1.HelperService])
], SingupController);
exports.SingupController = SingupController;
//# sourceMappingURL=singup.controller.js.map