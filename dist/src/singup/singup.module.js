"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingupModule = void 0;
const common_1 = require("@nestjs/common");
const singup_service_1 = require("./singup.service");
const users_service_1 = require("../users/users.service");
const singup_controller_1 = require("./singup.controller");
const user_schema_1 = require("../users/schemas/user.schema");
const ratingReview_schema_1 = require("../users/schemas/ratingReview.schema");
const momo_schema_1 = require("../users/schemas/momo.schema");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
const helper_1 = require("../common/helper");
let SingupModule = class SingupModule {
};
SingupModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: ratingReview_schema_1.RatingReview.name, schema: ratingReview_schema_1.RatingReviewSchema },
                { name: momo_schema_1.Momo.name, schema: momo_schema_1.MomoSchema },
            ]),
            jwt_1.JwtModule.register({
                secret: 'secretKey',
                signOptions: { expiresIn: '365d' },
            }),
        ],
        controllers: [singup_controller_1.SingupController],
        providers: [singup_service_1.SingupService, users_service_1.UsersService, helper_1.HelperService]
    })
], SingupModule);
exports.SingupModule = SingupModule;
//# sourceMappingURL=singup.module.js.map