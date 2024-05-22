/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { ScheduleDocument, ScheduleModel } from './schedule.model/schedule.model';
import { Model, Types } from 'mongoose';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
export declare class ScheduleService {
    private readonly scheduleModel;
    constructor(scheduleModel: Model<ScheduleDocument>);
    create(dto: CreateScheduleDto): Promise<ScheduleDocument>;
    get(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, ScheduleModel> & ScheduleModel & {
        _id: Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, ScheduleModel> & ScheduleModel & {
        _id: Types.ObjectId;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    delete(id: string): Promise<ScheduleDocument> | null;
    deleteByRoomId(roomId: string): Promise<import("mongodb").DeleteResult>;
    findByRoomId(roomId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, ScheduleModel> & ScheduleModel & {
        _id: Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, ScheduleModel> & ScheduleModel & {
        _id: Types.ObjectId;
    } & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, ScheduleModel> & ScheduleModel & {
        _id: Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, ScheduleModel> & ScheduleModel & {
        _id: Types.ObjectId;
    } & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    update(id: string, updatedScheduleDto: UpdateScheduleDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, ScheduleModel> & ScheduleModel & {
        _id: Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, ScheduleModel> & ScheduleModel & {
        _id: Types.ObjectId;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    softDelete(id: string): Promise<ScheduleDocument>;
}
