"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
var express = require('express');
const bodyParser = require('body-parser');
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.use(bodyParser.json({
        extended: true,
        limit: '50mb'
    }));
    app.use(express.static('public'));
    app.use('/public', express.static('public'));
    app.enableVersioning({
        type: common_1.VersioningType.URI,
    });
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map