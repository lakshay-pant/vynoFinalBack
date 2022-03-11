"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
const DEV = {
    DB_URL: 'mongodb://localhost/vyno',
    DB_USER: '',
    DB_PASS: '',
};
const PROD = {
    DB_URL: 'mongodb://vyno:VyNo171121@127.0.0.1:27017/vyno',
    DB_USER: 'vyno',
    DB_PASS: 'VyNo171121',
};
exports.ENV = DEV;
//# sourceMappingURL=environment.js.map