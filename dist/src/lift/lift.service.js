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
exports.LiftService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const lift_schema_1 = require("./schemas/lift.schema");
const liftRequest_schema_1 = require("./schemas/liftRequest.schema");
const liftBooking_schema_1 = require("./schemas/liftBooking.schema");
const liftNotification_schema_1 = require("./schemas/liftNotification.schema");
const virtualLift_schema_1 = require("./schemas/virtualLift.schema");
const virtualBuffer_schema_1 = require("./schemas/virtualBuffer.schema");
const configuration_1 = require("../../config/configuration");
var FCM = require('fcm-node');
var serverKey = configuration_1.FIREBASE_SERVER_KEY;
var fcm = new FCM(serverKey);
var moment = require('moment');
var mongoose = require('mongoose');
let LiftService = class LiftService {
    constructor(liftModel, liftRequestModel, liftBookingModel, liftNotification, virtualLift, virtualBufferModel) {
        this.liftModel = liftModel;
        this.liftRequestModel = liftRequestModel;
        this.liftBookingModel = liftBookingModel;
        this.liftNotification = liftNotification;
        this.virtualLift = virtualLift;
        this.virtualBufferModel = virtualBufferModel;
    }
    create(createLiftDto) {
        try {
            const createdlift = new this.liftModel(createLiftDto);
            return createdlift.save();
        }
        catch (e) {
            return e;
        }
    }
    findAll() {
        const alllift = this.liftModel.find().exec();
        return alllift;
    }
    myAllList(id) {
        const lift = this.liftModel.find({ user_id: mongoose.Types.ObjectId(id) }).exec();
        return lift;
    }
    findOne(id) {
        const lift = this.liftModel.findOne({ _id: mongoose.Types.ObjectId(id) }).exec();
        return lift;
    }
    activeBooking(id) {
        return this.liftBookingModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) }, { $set: { 'status': 'active' } });
    }
    fetchTodayBooking(user_id, date) {
        const mylift = this.liftBookingModel.aggregate([
            { $match: { "date": date } },
            { $match: { $or: [{ 'user_id': { $eq: mongoose.Types.ObjectId(user_id) } }, { 'driver_id': mongoose.Types.ObjectId(user_id) }] }, },
            {
                $lookup: {
                    from: 'users',
                    localField: 'driver_id',
                    foreignField: '_id',
                    as: 'rider'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'user'
                }
            }
        ]);
        return mylift;
    }
    deleteLift(id) {
        const deletelift = this.liftModel.findByIdAndRemove(id);
        return deletelift;
    }
    searchLift(query, user_id) {
        const dayname = moment(query.occasional, "D MMM YYYY").format("dddd");
        const lift = this.liftModel.find({
            $and: [
                { 'user_id': { $ne: mongoose.Types.ObjectId(user_id) } },
                { "type": query.type },
                { "to.address": query.to.address },
                { "from.address": query.from.address },
                { "passenger": query.passenger },
                { $or: [{ 'pick_preferences.gender': { $eq: query.pick_preferences.gender } }, { 'pick_preferences.gender': 'Any' }] },
                { $or: [{ 'pick_preferences.air_condition': { $eq: query.pick_preferences.air_condition } }, { 'pick_preferences.gender': 'Any' }] },
                { $or: [{ 'pick_preferences.pvt_lift': { $eq: query.pick_preferences.pvt_lift } }, { 'pick_preferences.pvt_lift': 'Any' }] },
                { $or: [{ 'pick_preferences.car': { $eq: query.pick_preferences.car } }, { 'pick_preferences.car': 'Any' }] },
            ]
        }).exec();
        return lift;
    }
    update(id, updateLiftDto) {
        return this.liftModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) }, { $set: updateLiftDto });
    }
    checkRequestExits(data) {
        try {
            const lift = this.liftRequestModel.findOne({
                $and: [
                    { "user_id": mongoose.Types.ObjectId(data.user_id) },
                    { "lift_id": mongoose.Types.ObjectId(data.lift_id) },
                    { "driver_id": mongoose.Types.ObjectId(data.driver_id) },
                    { "driver_status": '' },
                ]
            }).exec();
            return lift;
        }
        catch (e) {
            return e;
        }
    }
    createdLiftRequest(data) {
        try {
            const createdliftRequest = new this.liftRequestModel(data);
            return createdliftRequest.save();
        }
        catch (e) {
            return e;
        }
    }
    myLiftUserRequest(id) {
        try {
            const mylift = this.liftRequestModel.aggregate([
                { $match: { "user_id": mongoose.Types.ObjectId(id) } },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'driver_id',
                        foreignField: '_id',
                        as: 'rider'
                    }
                },
                {
                    $lookup: {
                        from: 'lifts',
                        localField: 'lift_id',
                        foreignField: '_id',
                        as: 'lift'
                    }
                }
            ]);
            return mylift;
        }
        catch (e) {
            return e;
        }
    }
    myVirtualLiftRequest(id) {
        try {
            const mylift = this.virtualLift.aggregate([
                { $match: { "user_id": mongoose.Types.ObjectId(id) } },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'user_id',
                        foreignField: '_id',
                        as: 'user'
                    }
                }
            ]);
            return mylift;
        }
        catch (e) {
            return e;
        }
    }
    myLiftDriverRequest(id) {
        try {
            const mylift = this.liftRequestModel.aggregate([
                { $match: { "driver_id": mongoose.Types.ObjectId(id) } },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'user_id',
                        foreignField: '_id',
                        as: 'rider'
                    }
                },
                {
                    $lookup: {
                        from: 'lifts',
                        localField: 'lift_id',
                        foreignField: '_id',
                        as: 'lift'
                    }
                }
            ]);
            return mylift;
        }
        catch (e) {
            return e;
        }
    }
    actionLiftRequest(query) {
        return this.liftRequestModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(query.lift_request_id) }, { $set: { 'driver_status': query.action } });
    }
    createdLiftBooking(query) {
        try {
            const createdLiftBooking = new this.liftBookingModel(query);
            return createdLiftBooking.save();
        }
        catch (e) {
            return e;
        }
    }
    cancleBooking(data) {
        try {
            return this.liftBookingModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(data.booking_id) }, { $set: { 'cancle_by': data.myrole, 'is_cancle': true } });
        }
        catch (e) {
            return e;
        }
    }
    myBookingData(id, role) {
        try {
            var condition;
            var lookup;
            if (role == 'driver') {
                condition = { "driver_id": mongoose.Types.ObjectId(id) };
                lookup = { $lookup: {
                        from: 'users',
                        localField: 'user_id',
                        foreignField: '_id',
                        as: 'user'
                    }
                };
            }
            else if (role == 'user') {
                condition = { "user_id": mongoose.Types.ObjectId(id) };
                lookup = { $lookup: {
                        from: 'users',
                        localField: 'driver_id',
                        foreignField: '_id',
                        as: 'driver'
                    }
                };
            }
            const fetchNotificationDriver = this.liftBookingModel.aggregate([
                { $match: condition },
                lookup,
            ]);
            return fetchNotificationDriver;
        }
        catch (e) {
            return e;
        }
    }
    createdNotification(data) {
        try {
            const createdNotification = new this.liftNotification(data);
            return createdNotification.save();
        }
        catch (e) {
            return e;
        }
    }
    fetchNotificationUser(userid) {
        try {
            const fetchNotificationUser = this.liftNotification.aggregate([
                { $match: { "notify_from": 'driver' } },
                { $match: { "user_id": mongoose.Types.ObjectId(userid) } },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'driver_id',
                        foreignField: '_id',
                        as: 'rider'
                    }
                },
                { "$sort": { "_id": -1 } }
            ]);
            return fetchNotificationUser;
        }
        catch (e) {
            return e;
        }
    }
    fetchNotificationDriver(driverid) {
        try {
            const fetchNotificationDriver = this.liftNotification.aggregate([
                { $match: { "notify_from": 'user' } },
                { $match: { "driver_id": mongoose.Types.ObjectId(driverid) } },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'user_id',
                        foreignField: '_id',
                        as: 'user'
                    }
                },
                { "$sort": { "_id": -1 } }
            ]);
            return fetchNotificationDriver;
        }
        catch (e) {
            return e;
        }
    }
    deleteAllNotification(notification_id) {
        const deleteNotifications = this.liftNotification.deleteMany({ _id: { $in: notification_id } });
        return deleteNotifications;
    }
    createVirtualLift(data) {
        try {
            const createdlift = new this.virtualLift(data);
            return createdlift.save();
        }
        catch (e) {
            return e;
        }
    }
    getVirtualLiftDetails(id) {
        const lift = this.virtualLift.findOne({ _id: mongoose.Types.ObjectId(id) }).exec();
        return lift;
    }
    updateVirtualLiftDetails(id, data) {
        return this.virtualLift.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) }, { $set: { 'rejected_id': data } });
    }
    getVirtualLift(user_id) {
        try {
            const allVirtualLift = this.virtualLift.aggregate([
                { "user_id": { $ne: mongoose.Types.ObjectId(user_id) } },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'user_id',
                        foreignField: '_id',
                        as: 'user'
                    }
                },
                { "$sort": { "_id": -1 } }
            ]).exec();
            return allVirtualLift;
        }
        catch (e) {
            return e;
        }
    }
    acceptVirtualLiftFromDriver(lift_id, data) {
        return this.virtualLift.findOneAndUpdate({ _id: mongoose.Types.ObjectId(lift_id) }, { $set: data });
    }
    removeVirtualLiftFromuser(lift_id) {
        return this.virtualLift.updateOne({ $unset: { accepted_id: "" } });
    }
    approvalVirtualLift(lift_id) {
        return this.virtualLift.findOneAndUpdate({ _id: mongoose.Types.ObjectId(lift_id) }, { $set: { 'approval': true } });
    }
    addAmountInVirtualBuffer(data) {
        try {
            const addAmount = new this.virtualBufferModel(data);
            return addAmount.save();
        }
        catch (e) {
            return e;
        }
    }
    getVirtualBuffer(id) {
        const bufferData = this.virtualBufferModel.findOne({ booking_id: mongoose.Types.ObjectId(id) }).exec();
        return bufferData;
    }
    removeBufferData(id) {
        const deleteData = this.virtualBufferModel.findByIdAndDelete(id);
        return deleteData;
    }
};
LiftService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(lift_schema_1.Lift.name)),
    __param(1, (0, mongoose_1.InjectModel)(liftRequest_schema_1.LiftRequest.name)),
    __param(2, (0, mongoose_1.InjectModel)(liftBooking_schema_1.LiftBooking.name)),
    __param(3, (0, mongoose_1.InjectModel)(liftNotification_schema_1.LiftNotification.name)),
    __param(4, (0, mongoose_1.InjectModel)(virtualLift_schema_1.VirtualLift.name)),
    __param(5, (0, mongoose_1.InjectModel)(virtualBuffer_schema_1.VirtualBuffer.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], LiftService);
exports.LiftService = LiftService;
//# sourceMappingURL=lift.service.js.map