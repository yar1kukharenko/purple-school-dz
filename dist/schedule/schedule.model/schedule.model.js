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
exports.ScheduleSchema = exports.ScheduleModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const room_model_1 = require("../../room/room.model/room.model");
let ScheduleModel = class ScheduleModel {
};
exports.ScheduleModel = ScheduleModel;
__decorate([
    (0, mongoose_2.Prop)({ required: true, type: mongoose_1.Schema.Types.ObjectId, ref: room_model_1.RoomModel.name }),
    __metadata("design:type", String)
], ScheduleModel.prototype, "roomId", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: true, type: 'date' }),
    __metadata("design:type", Date)
], ScheduleModel.prototype, "date", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: false, default: null }),
    __metadata("design:type", Date)
], ScheduleModel.prototype, "deletedAt", void 0);
exports.ScheduleModel = ScheduleModel = __decorate([
    (0, mongoose_2.Schema)({ timestamps: true })
], ScheduleModel);
exports.ScheduleSchema = mongoose_2.SchemaFactory.createForClass(ScheduleModel);
//# sourceMappingURL=schedule.model.js.map