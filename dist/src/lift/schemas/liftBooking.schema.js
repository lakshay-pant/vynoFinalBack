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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiftBookingSchema = exports.LiftBooking = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../../users/schemas/user.schema");
const mongoose = require("mongoose");
const liftRequest_schema_1 = require("./liftRequest.schema");
let LiftBooking = class LiftBooking {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'LiftRequest' }),
    __metadata("design:type", liftRequest_schema_1.LiftRequest)
], LiftBooking.prototype, "lift_request_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", user_schema_1.User)
], LiftBooking.prototype, "user_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", user_schema_1.User)
], LiftBooking.prototype, "driver_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, required: true }),
    __metadata("design:type", Object)
], LiftBooking.prototype, "to", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, required: true }),
    __metadata("design:type", Object)
], LiftBooking.prototype, "from", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], LiftBooking.prototype, "passenger", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], LiftBooking.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: false }),
    __metadata("design:type", Boolean)
], LiftBooking.prototype, "is_virtual", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], LiftBooking.prototype, "distance", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true
    }),
    __metadata("design:type", String)
], LiftBooking.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        default: false
    }),
    __metadata("design:type", Boolean)
], LiftBooking.prototype, "is_cancle", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ['user', 'driver'],
    }),
    __metadata("design:type", String)
], LiftBooking.prototype, "cancle_by", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ['active', 'completed', 'inactive'],
        default: 'inactive'
    }),
    __metadata("design:type", String)
], LiftBooking.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], LiftBooking.prototype, "created_at", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], LiftBooking.prototype, "updated_at", void 0);
LiftBooking = __decorate([
    (0, mongoose_1.Schema)()
], LiftBooking);
exports.LiftBooking = LiftBooking;
exports.LiftBookingSchema = mongoose_1.SchemaFactory.createForClass(LiftBooking);
//# sourceMappingURL=liftBooking.schema.js.map