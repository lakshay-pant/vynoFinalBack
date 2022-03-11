"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiftModule = void 0;
const common_1 = require("@nestjs/common");
const lift_service_1 = require("./lift.service");
const lift_controller_1 = require("./lift.controller");
const mongoose_1 = require("@nestjs/mongoose");
const lift_schema_1 = require("./schemas/lift.schema");
const user_schema_1 = require("../users/schemas/user.schema");
const liftRequest_schema_1 = require("./schemas/liftRequest.schema");
const liftBooking_schema_1 = require("./schemas/liftBooking.schema");
const virtualBuffer_schema_1 = require("./schemas/virtualBuffer.schema");
const virtualLift_schema_1 = require("./schemas/virtualLift.schema");
const liftNotification_schema_1 = require("./schemas/liftNotification.schema");
const ratingReview_schema_1 = require("../users/schemas/ratingReview.schema");
const momo_schema_1 = require("../users/schemas/momo.schema");
const users_service_1 = require(".././users/users.service");
const jwt_1 = require("@nestjs/jwt");
const helper_1 = require("../common/helper");
const platform_express_1 = require("@nestjs/platform-express");
let LiftModule = class LiftModule {
};
LiftModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: lift_schema_1.Lift.name, schema: lift_schema_1.LiftSchema },
                { name: liftRequest_schema_1.LiftRequest.name, schema: liftRequest_schema_1.LiftRequestSchema },
                { name: liftBooking_schema_1.LiftBooking.name, schema: liftBooking_schema_1.LiftBookingSchema },
                { name: liftNotification_schema_1.LiftNotification.name, schema: liftNotification_schema_1.LiftNotificationSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: ratingReview_schema_1.RatingReview.name, schema: ratingReview_schema_1.RatingReviewSchema },
                { name: virtualLift_schema_1.VirtualLift.name, schema: virtualLift_schema_1.VirtualLiftSchema },
                { name: momo_schema_1.Momo.name, schema: momo_schema_1.MomoSchema },
                { name: virtualBuffer_schema_1.VirtualBuffer.name, schema: virtualBuffer_schema_1.VirtualBufferSchema },
            ]),
            jwt_1.JwtModule.register({
                secret: 'secretKey',
                signOptions: { expiresIn: '365d' },
            }),
            platform_express_1.MulterModule.register({
                dest: './public/uploads/document/',
            })
        ],
        controllers: [lift_controller_1.LiftController],
        providers: [lift_service_1.LiftService, helper_1.HelperService, users_service_1.UsersService]
    })
], LiftModule);
exports.LiftModule = LiftModule;
//# sourceMappingURL=lift.module.js.map