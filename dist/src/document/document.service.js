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
exports.DocumentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const document_schema_1 = require("./schemas/document.schema");
var mongoose = require('mongoose');
let DocumentService = class DocumentService {
    constructor(documentsModel) {
        this.documentsModel = documentsModel;
    }
    create(createDocumentDto) {
        return 'This action adds a new document';
    }
    findAll() {
        return `This action returns all document`;
    }
    findOne(id) {
        return `This action returns a #${id} document`;
    }
    checkData(id, role) {
        const checkData = this.documentsModel.findOne({ $and: [{ 'user_id': mongoose.Types.ObjectId(id) }, { 'role': role }] });
        return checkData;
    }
    checkAccountStatusFromId(user_id) {
        const checkData = this.documentsModel.find({ 'user_id': mongoose.Types.ObjectId(user_id) });
        return checkData;
    }
    updateInsert(id, role, data, type) {
        data['user_id'] = id;
        data['role'] = role;
        if (type == 'insert') {
            const uploadUser = new this.documentsModel(data);
            return uploadUser.save();
        }
        else if (type == 'update') {
            const updateuser = this.documentsModel.findOneAndUpdate({ $and: [{ 'user_id': mongoose.Types.ObjectId(id) }, { 'role': role }] }, { $set: data });
            return updateuser;
        }
    }
    remove(id) {
        return `This action removes a #${id} document`;
    }
};
DocumentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(document_schema_1.Documents.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DocumentService);
exports.DocumentService = DocumentService;
//# sourceMappingURL=document.service.js.map