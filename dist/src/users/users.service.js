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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
const ratingReview_schema_1 = require("./schemas/ratingReview.schema");
const momo_schema_1 = require("./schemas/momo.schema");
var mongoose = require('mongoose');
let UsersService = class UsersService {
    constructor(userModel, ratingReviewModel, momoModel) {
        this.userModel = userModel;
        this.ratingReviewModel = ratingReviewModel;
        this.momoModel = momoModel;
    }
    create(createUserDto) {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }
    findAll() {
        const allUser = this.userModel.find().exec();
        return allUser;
    }
    findData(item) {
        const findUser = this.userModel.findOne(item).exec();
        return findUser;
    }
    findDataFromId(id) {
        const findUser = this.userModel.findOne({ _id: mongoose.Types.ObjectId(id) }).exec();
        return findUser;
    }
    update(id, updateUserDto) {
        const updateuser = this.userModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) }, { $set: updateUserDto });
        return updateuser;
    }
    createMomoCredential(data) {
        const createdMomo = new this.momoModel(data);
        return createdMomo.save();
    }
    findMomoCredential(user_id) {
        return this.momoModel.findOne({ user_id: mongoose.Types.ObjectId(user_id) }).exec();
    }
    updateOtp(item) {
        return this.userModel.findOneAndUpdate({ "phone_number": item.phone_number, 'country_code': item.country_code }, { $set: { "verify_otp": "1234", "updated_at": item.updated_at } });
    }
    updateUserWallet(user_id, amount) {
        return this.userModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(user_id) }, { $set: { "wallet_amount_user": amount } });
    }
    deleteUser(user_id) {
        return this.userModel.findByIdAndDelete(user_id);
    }
    review(data) {
        const review = new this.ratingReviewModel(data);
        return review.save();
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(ratingReview_schema_1.RatingReview.name)),
    __param(2, (0, mongoose_1.InjectModel)(momo_schema_1.Momo.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map