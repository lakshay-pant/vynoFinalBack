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
exports.HistorySchema = exports.History = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const payment_schema_1 = require("../schemas/payment.schema");
const liftBooking_schema_1 = require("../../lift/schemas/liftBooking.schema");
const mongoose = require("mongoose");
let History = class History {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        enum: ['credit', 'debit'],
    }),
    __metadata("design:type", String)
], History.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }),
    __metadata("design:type", payment_schema_1.Payment)
], History.prototype, "payment_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'LiftBooking' }),
    __metadata("design:type", liftBooking_schema_1.LiftBooking)
], History.prototype, "booking_id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], History.prototype, "created_at", void 0);
History = __decorate([
    (0, mongoose_1.Schema)()
], History);
exports.History = History;
exports.HistorySchema = mongoose_1.SchemaFactory.createForClass(History);
//# sourceMappingURL=history.schema.js.map