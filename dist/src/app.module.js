"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mongoose_1 = require("@nestjs/mongoose");
const users_module_1 = require("./users/users.module");
const jwt_1 = require("@nestjs/jwt");
const auth_module_1 = require("./auth/auth.module");
const singup_module_1 = require("./singup/singup.module");
const login_middleware_1 = require("./common/login.middleware");
const config_1 = require("@nestjs/config");
const environment_1 = require("../config/environment");
const address_module_1 = require("./address/address.module");
const platform_express_1 = require("@nestjs/platform-express");
const admin_module_1 = require("./admin/admin.module");
const lift_module_1 = require("./lift/lift.module");
const document_module_1 = require("./document/document.module");
const payment_module_1 = require("./payment/payment.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(login_middleware_1.LoginMiddleware)
            .forRoutes('v1/user');
        consumer
            .apply(login_middleware_1.LoginMiddleware)
            .forRoutes('v1/admin');
        consumer
            .apply(login_middleware_1.LoginMiddleware)
            .forRoutes('v1/lift');
        consumer
            .apply(login_middleware_1.LoginMiddleware)
            .forRoutes('v1/address');
        consumer
            .apply(login_middleware_1.LoginMiddleware)
            .forRoutes('v1/document');
        consumer
            .apply(login_middleware_1.LoginMiddleware)
            .forRoutes('v1/payment');
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot(environment_1.ENV.DB_URL),
            users_module_1.UsersModule,
            jwt_1.JwtModule.register({
                secret: 'secretKey',
                signOptions: { expiresIn: '365d' },
            }),
            auth_module_1.AuthModule,
            singup_module_1.SingupModule,
            config_1.ConfigModule.forRoot(),
            address_module_1.AddressModule,
            platform_express_1.MulterModule.register({
                dest: './public/uploads/document/',
            }),
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            admin_module_1.AdminModule,
            lift_module_1.LiftModule,
            document_module_1.DocumentModule,
            payment_module_1.PaymentModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map