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
exports.LiftRequestSchema = exports.LiftRequest = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../../users/schemas/user.schema");
const mongoose = require("mongoose");
const lift_schema_1 = require("./lift.schema");
let LiftRequest = class LiftRequest {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", user_schema_1.User)
], LiftRequest.prototype, "user_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'Lift', required: true }),
    __metadata("design:type", lift_schema_1.Lift)
], LiftRequest.prototype, "lift_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", user_schema_1.User)
], LiftRequest.prototype, "driver_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], LiftRequest.prototype, "passenger", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        enum: ['inititate', 'accepted', 'rejected'],
    }),
    __metadata("design:type", String)
], LiftRequest.prototype, "user_status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true
    }),
    __metadata("design:type", String)
], LiftRequest.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
    }),
    __metadata("design:type", String)
], LiftRequest.prototype, "driver_status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], LiftRequest.prototype, "created_at", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], LiftRequest.prototype, "created_at_time", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], LiftRequest.prototype, "updated_at", void 0);
LiftRequest = __decorate([
    (0, mongoose_1.Schema)()
], LiftRequest);
exports.LiftRequest = LiftRequest;
exports.LiftRequestSchema = mongoose_1.SchemaFactory.createForClass(LiftRequest);
//# sourceMappingURL=liftRequest.schema.js.map