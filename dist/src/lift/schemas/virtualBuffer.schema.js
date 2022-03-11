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
exports.VirtualBufferSchema = exports.VirtualBuffer = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../../users/schemas/user.schema");
const liftBooking_schema_1 = require("../schemas/liftBooking.schema");
const mongoose = require("mongoose");
let VirtualBuffer = class VirtualBuffer {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", user_schema_1.User)
], VirtualBuffer.prototype, "user_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'LiftBooking', required: true }),
    __metadata("design:type", liftBooking_schema_1.LiftBooking)
], VirtualBuffer.prototype, "booking_id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], VirtualBuffer.prototype, "amount", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VirtualBuffer.prototype, "created_at", void 0);
VirtualBuffer = __decorate([
    (0, mongoose_1.Schema)()
], VirtualBuffer);
exports.VirtualBuffer = VirtualBuffer;
exports.VirtualBufferSchema = mongoose_1.SchemaFactory.createForClass(VirtualBuffer);
//# sourceMappingURL=virtualBuffer.schema.js.map