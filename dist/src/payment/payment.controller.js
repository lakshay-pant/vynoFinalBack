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
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const payment_service_1 = require("./payment.service");
const update_payment_dto_1 = require("./dto/update-payment.dto");
const users_service_1 = require("../users/users.service");
const helper_1 = require("../common/helper");
const configuration_1 = require("../../config/configuration");
const uuid_1 = require("uuid");
const moment = require("moment");
const { base64encode, base64decode } = require('nodejs-base64');
let fetch = require('node-fetch');
let PaymentController = class PaymentController {
    constructor(paymentService, usersService, helperService) {
        this.paymentService = paymentService;
        this.usersService = usersService;
        this.helperService = helperService;
    }
    async create(body) {
        const user_id = body.user.id;
        const role = body.role;
        if (!body['amount'] || !body['partyId'] || role !== 'user') {
            return { "status": false, message: 'provide valid parameter' };
        }
        const findMomoCredential = await this.usersService.findMomoCredential(body.user.id);
        if (!findMomoCredential) {
            return { "status": false, message: 'your account not found in momo mtn' };
        }
        var url = configuration_1.MOMO.MOMO_URL + '/collection/token/';
        var headerfortoken = {
            "Authorization": "Basic " + base64encode(findMomoCredential['username'] + ":" + findMomoCredential['password']),
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': configuration_1.MOMO.OcpApimSubscriptionKey,
            'Content-Length': '0'
        };
        return await fetch(url, {
            method: 'POST',
            headers: headerfortoken
        })
            .then(async (responsedata) => {
            if (responsedata.status == 200) {
                var result = await responsedata.json();
                const bodydata = {
                    "amount": body['amount'],
                    "currency": "EUR",
                    "externalId": "6353636",
                    "payer": {
                        "partyIdType": "MSISDN",
                        "partyId": body['partyId']
                    },
                    "payerMessage": "pay for ride",
                    "payeeNote": "pay for ride"
                };
                var url = configuration_1.MOMO.MOMO_URL + '/collection/v1_0/requesttopay';
                var uuidv4 = (0, uuid_1.v4)();
                var headerForpayment = {
                    'Content-Type': 'application/json',
                    'Ocp-Apim-Subscription-Key': configuration_1.MOMO.OcpApimSubscriptionKey,
                    'X-Reference-Id': uuidv4,
                    'X-Target-Environment': configuration_1.MOMO.XTargetEnvironment,
                    'Authorization': 'Bearer ' + result.access_token
                };
                return await fetch(url, {
                    method: 'POST',
                    headers: headerForpayment,
                    body: JSON.stringify(bodydata)
                }).then(async (response) => {
                    var paymentData = {
                        'user_id': user_id,
                        'request_uuid': uuidv4,
                        'amount': body['amount'],
                        'created_at': moment().format('DD/MM/YYYY h:mm A')
                    };
                    if (response.status === 202) {
                        paymentData['status'] = 'success';
                        paymentData['message'] = 'fund added successful';
                        const payment = await this.paymentService.create(paymentData);
                        const fetchUserDetails = await this.usersService.findDataFromId(user_id);
                        var amount = parseInt(fetchUserDetails['wallet_amount_user']) + parseInt(body['amount']);
                        const updateUserWallet = await this.usersService.updateUserWallet(user_id, amount);
                        const history = {
                            "type": 'credit',
                            "payment_id": payment['_id'],
                            "created_at": moment().format('DD/MM/YYYY h:mm A')
                        };
                        const historyCreate = await this.paymentService.historyCreate(history);
                        return { status: true, message: "payment request successful" };
                    }
                    else {
                        paymentData['status'] = 'failed';
                        paymentData['message'] = 'invalid number';
                        await this.paymentService.create(paymentData);
                        return { status: false, message: 'invalid number' };
                    }
                }).catch(error => {
                    return { status: false, message: error };
                });
            }
            else {
                return { status: false, message: '' };
            }
        })
            .catch(error => {
            return { status: false, message: error };
        });
    }
    findAll() {
        return this.paymentService.findAll();
    }
    findOne(id) {
        return this.paymentService.findOne(+id);
    }
    update(id, updatePaymentDto) {
        return this.paymentService.update(+id, updatePaymentDto);
    }
    remove(id) {
        return this.paymentService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)('request-to-pay'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_payment_dto_1.UpdatePaymentDto]),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "remove", null);
PaymentController = __decorate([
    (0, common_1.Controller)({ path: 'payment', version: '1' }),
    __metadata("design:paramtypes", [payment_service_1.PaymentService,
        users_service_1.UsersService,
        helper_1.HelperService])
], PaymentController);
exports.PaymentController = PaymentController;
//# sourceMappingURL=payment.controller.js.map