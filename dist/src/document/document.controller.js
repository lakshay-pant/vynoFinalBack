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
exports.DocumentController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const document_service_1 = require("./document.service");
const create_document_dto_1 = require("./dto/create-document.dto");
const helper_1 = require("../common/helper");
const jwt_1 = require("@nestjs/jwt");
const fs = require("fs");
let DocumentController = class DocumentController {
    constructor(documentService, jwtService, helperService) {
        this.documentService = documentService;
        this.jwtService = jwtService;
        this.helperService = helperService;
    }
    create(createDocumentDto) {
        return this.documentService.create(createDocumentDto);
    }
    async accountStatus(body) {
        const user_id = body.user.id;
        const findstatus = await this.documentService.checkAccountStatusFromId(user_id);
        var data = {};
        if (findstatus.length > 0) {
            findstatus.map((item, index) => {
                if (item && item['account_status'] && item['role'] == '0') {
                    data['user_status'] = item['account_status'];
                }
                else if (item && item['account_status'] && item['role'] == '1') {
                    data['driver_status'] = item['account_status'];
                }
            });
            if (!data['user_status']) {
                data['user_status'] = '';
            }
            if (!data['driver_status']) {
                data['driver_status'] = '';
            }
            return { "status": true, data: data };
        }
        else {
            return { "status": true, data: { user_status: '', driver_status: '' } };
        }
    }
    async updateStatus(body) {
        const id = body.user.id;
        const role = body.role;
        const status = body.account_status;
        var statusArray = ["pending", "approved", "rejected"];
        var checkStatus = statusArray.includes(status);
        if (!role || !status || !checkStatus) {
            return { status: false, message: "provide valid parameter" };
        }
        const update = await this.documentService.updateInsert(id, role, { account_status: "approved" }, 'update');
        if (update) {
            return { status: true, message: "update successfully" };
        }
        else {
            return { "status": true, message: "data not found" };
        }
    }
    async uploadFile(body, files) {
        try {
            var i = 0;
            var fielddata = [];
            var id = body.id;
            var role = body.role;
            var updateUser;
            if (Array.isArray(files) && files.length) {
                for (let i = 0; i < files.length; i++) {
                    fielddata[files[i].fieldname] = files[i].path;
                    const extension = files[i].mimetype.split("/")[1];
                    fs.rename(files[i].path, files[i].path + '.' + extension, function (err) {
                    });
                    if (!id || !role) {
                        console.log("delete" + "  " + files[i].path + '.' + extension);
                        fs.unlinkSync(files[i].path + '.' + extension);
                    }
                    else {
                        const updateUserDocument = {
                            [files[i].fieldname]: files[i].path + '.' + extension
                        };
                        const checkdata = await this.documentService.checkData(id, role);
                        if (checkdata) {
                            updateUser = await this.documentService.updateInsert(id, role, updateUserDocument, 'update');
                        }
                        else {
                            updateUser = await this.documentService.updateInsert(id, role, updateUserDocument, 'insert');
                        }
                    }
                    if (i == files.length - 1) {
                        if (!id || !role) {
                            return { status: false, message: "provide valid parameter" };
                        }
                        else {
                            const documentStatus = {
                                'account_status': 'pending'
                            };
                            await this.documentService.updateInsert(id, role, documentStatus, 'update');
                            return { status: true, message: "document update successfully" };
                        }
                    }
                }
            }
            else {
                return { "status": false, message: "minimum 1 file upload" };
            }
        }
        catch (e) {
            return { "status": false, message: e };
        }
    }
};
__decorate([
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_document_dto_1.CreateDocumentDto]),
    __metadata("design:returntype", void 0)
], DocumentController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('get-account-status'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "accountStatus", null);
__decorate([
    (0, common_1.Post)('update-account-status'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Post)('/upload-document'),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "uploadFile", null);
DocumentController = __decorate([
    (0, common_1.Controller)({ path: 'document', version: '1' }),
    __metadata("design:paramtypes", [document_service_1.DocumentService,
        jwt_1.JwtService,
        helper_1.HelperService])
], DocumentController);
exports.DocumentController = DocumentController;
//# sourceMappingURL=document.controller.js.map