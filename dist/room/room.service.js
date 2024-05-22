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
exports.RoomService = void 0;
const common_1 = require("@nestjs/common");
const room_model_1 = require("./room.model/room.model");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let RoomService = class RoomService {
    constructor(roomModel) {
        this.roomModel = roomModel;
    }
    async create(dto) {
        return this.roomModel.create(dto);
    }
    async delete(id) {
        return this.roomModel.findByIdAndDelete(id).exec();
    }
    async findRoomById(roomId) {
        return this.roomModel.findById(roomId).exec();
    }
    async findAll() {
        return this.roomModel.find().exec();
    }
    async update(roomId, updatedRoomDto) {
        return this.roomModel.findByIdAndUpdate(roomId, updatedRoomDto, {
            new: true,
        });
    }
    async softDelete(id) {
        return this.roomModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
    }
};
exports.RoomService = RoomService;
exports.RoomService = RoomService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(room_model_1.RoomModel.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], RoomService);
//# sourceMappingURL=room.service.js.map