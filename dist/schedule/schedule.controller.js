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
exports.ScheduleController = void 0;
const common_1 = require("@nestjs/common");
const schedule_service_1 = require("./schedule.service");
const create_schedule_dto_1 = require("./dto/create-schedule.dto");
const schedule_constants_1 = require("./schedule.constants");
const update_schedule_dto_1 = require("./dto/update-schedule.dto");
let ScheduleController = class ScheduleController {
    constructor(scheduleService) {
        this.scheduleService = scheduleService;
    }
    async create(dto) {
        return await this.scheduleService.create(dto);
    }
    async findByRoom(roomId) {
        return await this.scheduleService.findByRoomId(roomId);
    }
    async getAll() {
        return await this.scheduleService.findAll();
    }
    async get(id) {
        return await this.scheduleService.get(id);
    }
    async deleteByRoom(roomId) {
        const deletedSchedule = await this.scheduleService.deleteByRoomId(roomId);
        if (!deletedSchedule) {
            throw new common_1.HttpException(schedule_constants_1.SCHEDULE_NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async softDelete(id) {
        const deletedSchedule = await this.scheduleService.softDelete(id);
        if (!deletedSchedule) {
            throw new common_1.HttpException(schedule_constants_1.SCHEDULE_NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async delete(id) {
        const deletedSchedule = await this.scheduleService.delete(id);
        if (!deletedSchedule) {
            throw new common_1.HttpException(schedule_constants_1.SCHEDULE_NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async patch(id, dto) {
        const updatedSchedule = await this.scheduleService.update(id, dto);
        if (!updatedSchedule) {
            throw new common_1.HttpException(schedule_constants_1.SCHEDULE_NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
        }
    }
};
exports.ScheduleController = ScheduleController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_schedule_dto_1.CreateScheduleDto]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('getByRoom/:roomId'),
    __param(0, (0, common_1.Param)('roomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "findByRoom", null);
__decorate([
    (0, common_1.Get)('getAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "get", null);
__decorate([
    (0, common_1.Delete)('deleteByRoom/:roomId'),
    __param(0, (0, common_1.Param)('roomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "deleteByRoom", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "softDelete", null);
__decorate([
    (0, common_1.Delete)('hardDelete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "delete", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_schedule_dto_1.UpdateScheduleDto]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "patch", null);
exports.ScheduleController = ScheduleController = __decorate([
    (0, common_1.Controller)('schedule'),
    __metadata("design:paramtypes", [schedule_service_1.ScheduleService])
], ScheduleController);
//# sourceMappingURL=schedule.controller.js.map