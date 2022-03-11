"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentModule = void 0;
const common_1 = require("@nestjs/common");
const document_service_1 = require("./document.service");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
const document_controller_1 = require("./document.controller");
const document_schema_1 = require("./schemas/document.schema");
const helper_1 = require("../common/helper");
const platform_express_1 = require("@nestjs/platform-express");
let DocumentModule = class DocumentModule {
};
DocumentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: document_schema_1.Documents.name, schema: document_schema_1.DocumentsSchema }]),
            jwt_1.JwtModule.register({
                secret: 'secretKey',
                signOptions: { expiresIn: '365d' },
            }),
            platform_express_1.MulterModule.register({
                dest: './public/uploads/document/',
            })
        ],
        controllers: [document_controller_1.DocumentController],
        providers: [document_service_1.DocumentService, helper_1.HelperService]
    })
], DocumentModule);
exports.DocumentModule = DocumentModule;
//# sourceMappingURL=document.module.js.map