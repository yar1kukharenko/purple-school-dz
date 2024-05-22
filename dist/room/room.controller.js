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
exports.RoomController = void 0;
const common_1 = require("@nestjs/common");
const create_room_dto_1 = require("./dto/create-room.dto");
const room_service_1 = require("./room.service");
const room_constants_1 = require("./room.constants");
const update_room_dto_1 = require("./dto/update-room.dto");
const schedule_constants_1 = require("../schedule/schedule.constants");
let RoomController = class RoomController {
    constructor(roomService) {
        this.roomService = roomService;
    }
    async create(dto) {
        return await this.roomService.create(dto);
    }
    async getAll() {
        return await this.roomService.findAll();
    }
    async get(id) {
        return await this.roomService.findRoomById(id);
    }
    async delete(id) {
        const deletedRoom = await this.roomService.delete(id);
        if (!deletedRoom) {
            throw new common_1.HttpException(room_constants_1.ROOM_NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async softDelete(id) {
        const deletedSchedule = await this.roomService.softDelete(id);
        if (!deletedSchedule) {
            throw new common_1.HttpException(schedule_constants_1.SCHEDULE_NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async patch(id, dto) {
        const updatedRoom = await this.roomService.update(id, dto);
        if (!updatedRoom) {
            throw new common_1.HttpException(room_constants_1.ROOM_NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
        }
    }
};
exports.RoomController = RoomController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_room_dto_1.CreateRoomDto]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('getAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "get", null);
__decorate([
    (0, common_1.Delete)('hardDelete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "delete", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "softDelete", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_room_dto_1.UpdateRoomDto]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "patch", null);
exports.RoomController = RoomController = __decorate([
    (0, common_1.Controller)('room'),
    __metadata("design:paramtypes", [room_service_1.RoomService])
], RoomController);
//# sourceMappingURL=room.controller.js.map