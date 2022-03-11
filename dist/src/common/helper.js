"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelperService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const configuration_1 = require("../../config/configuration");
const mime = require('mime');
const multer = require('multer');
const NodeGeocoder = require('node-geocoder');
const options = {
    provider: 'google',
    apiKey: '',
    formatter: null
};
const geocoder = NodeGeocoder(options);
var FCM = require('fcm-node');
var serverKey = configuration_1.FIREBASE_SERVER_KEY;
var fcm = new FCM(serverKey);
let HelperService = class HelperService {
    base64ImageUpload(imgBase64) {
        try {
            var matches = imgBase64.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
            const response = {};
            if (matches.length !== 3) {
                return { "status": "false", message: 'invalid format of images' };
            }
            var dir = './public/uploads/images/';
            var pathDir = '/public/uploads/images/';
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            let imageBuffer = Buffer.from(matches[2], 'base64');
            let type = matches[1];
            let extension = mime.extension(type);
            const d = new Date();
            let time = d.getTime();
            let fileName = "image" + time + "." + extension;
            fs.writeFileSync(dir + fileName, imageBuffer, 'utf8');
            let path = pathDir + fileName;
            return { "status": true, path: path };
        }
        catch (e) {
            return { "status": false, message: e };
        }
    }
    documentUpload(data) {
        try {
            var dir = './public/uploads/document';
            var pathDir = '/public/uploads/document';
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            var array = [];
            data.map((item, index) => {
                array.push(item);
            });
            return array;
        }
        catch (e) {
            return { "status": "false", message: e };
        }
    }
    removeUnderscoreFromcolumn(data) {
        var User = JSON.parse(JSON.stringify(data));
        User['id'] = User._id;
        delete User.__v;
        delete User._id;
        return User;
    }
    getReverseGeocodingData(lat, lng) {
        const res = geocoder.reverse({ lat: lat, lon: lng });
        return res;
    }
    pushNotifications(fcm_token, title_msg, msg) {
        if (configuration_1.PUSH_NOTIFICATION && fcm_token) {
            var message = {
                to: fcm_token,
                notification: {
                    title: title_msg,
                    body: msg
                },
            };
            fcm.send(message, function (err, response) {
                if (err) {
                    console.log("Something has gone wrong!");
                }
                else {
                    console.log("Successfully sent with response: ", response);
                }
            });
        }
    }
};
HelperService = __decorate([
    (0, common_1.Injectable)()
], HelperService);
exports.HelperService = HelperService;
//# sourceMappingURL=helper.js.map