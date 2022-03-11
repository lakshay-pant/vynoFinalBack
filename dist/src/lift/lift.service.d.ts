import { CreateLiftDto } from './dto/create-lift.dto';
import { UpdateLiftDto } from './dto/update-lift.dto';
import { Model } from 'mongoose';
export declare class LiftService {
    private liftModel;
    private liftRequestModel;
    private liftBookingModel;
    private liftNotification;
    private virtualLift;
    private virtualBufferModel;
    constructor(liftModel: Model<CreateLiftDto>, liftRequestModel: Model<{}>, liftBookingModel: Model<{}>, liftNotification: Model<{}>, virtualLift: Model<{}>, virtualBufferModel: Model<{}>);
    create(createLiftDto: CreateLiftDto): any;
    findAll(): Promise<(import("mongoose").Document<any, any, CreateLiftDto> & CreateLiftDto & {
        _id: unknown;
    })[]>;
    myAllList(id: any): Promise<(import("mongoose").Document<any, any, CreateLiftDto> & CreateLiftDto & {
        _id: unknown;
    })[]>;
    findOne(id: any): Promise<import("mongoose").Document<any, any, CreateLiftDto> & CreateLiftDto & {
        _id: unknown;
    }>;
    activeBooking(id: any): import("mongoose").Query<import("mongoose").Document<any, any, {}> & {
        _id: unknown;
    }, import("mongoose").Document<any, any, {}> & {
        _id: unknown;
    }, {}, {}>;
    fetchTodayBooking(user_id: any, date: any): import("mongoose").Aggregate<any[]>;
    deleteLift(id: any): import("mongoose").Query<import("mongoose").Document<any, any, CreateLiftDto> & CreateLiftDto & {
        _id: unknown;
    }, import("mongoose").Document<any, any, CreateLiftDto> & CreateLiftDto & {
        _id: unknown;
    }, {}, CreateLiftDto>;
    searchLift(query: any, user_id: any): Promise<(import("mongoose").Document<any, any, CreateLiftDto> & CreateLiftDto & {
        _id: unknown;
    })[]>;
    update(id: any, updateLiftDto: UpdateLiftDto): import("mongoose").Query<import("mongoose").Document<any, any, CreateLiftDto> & CreateLiftDto & {
        _id: unknown;
    }, import("mongoose").Document<any, any, CreateLiftDto> & CreateLiftDto & {
        _id: unknown;
    }, {}, CreateLiftDto>;
    checkRequestExits(data: any): any;
    createdLiftRequest(data: any): any;
    myLiftUserRequest(id: any): any;
    myVirtualLiftRequest(id: any): any;
    myLiftDriverRequest(id: any): any;
    actionLiftRequest(query: any): import("mongoose").Query<import("mongoose").Document<any, any, {}> & {
        _id: unknown;
    }, import("mongoose").Document<any, any, {}> & {
        _id: unknown;
    }, {}, {}>;
    createdLiftBooking(query: any): any;
    cancleBooking(data: any): any;
    myBookingData(id: any, role: any): any;
    createdNotification(data: any): any;
    fetchNotificationUser(userid: any): any;
    fetchNotificationDriver(driverid: any): any;
    deleteAllNotification(notification_id: any): import("mongoose").Query<import("mongodb").DeleteResult, import("mongoose").Document<any, any, {}> & {
        _id: unknown;
    }, {}, {}>;
    createVirtualLift(data: any): any;
    getVirtualLiftDetails(id: any): Promise<import("mongoose").Document<any, any, {}> & {
        _id: unknown;
    }>;
    updateVirtualLiftDetails(id: any, data: any): import("mongoose").Query<import("mongoose").Document<any, any, {}> & {
        _id: unknown;
    }, import("mongoose").Document<any, any, {}> & {
        _id: unknown;
    }, {}, {}>;
    getVirtualLift(user_id: any): any;
    acceptVirtualLiftFromDriver(lift_id: any, data: any): import("mongoose").Query<import("mongoose").Document<any, any, {}> & {
        _id: unknown;
    }, import("mongoose").Document<any, any, {}> & {
        _id: unknown;
    }, {}, {}>;
    removeVirtualLiftFromuser(lift_id: any): import("mongoose").Query<import("mongodb").UpdateResult, import("mongoose").Document<any, any, {}> & {
        _id: unknown;
    }, {}, {}>;
    approvalVirtualLift(lift_id: any): import("mongoose").Query<import("mongoose").Document<any, any, {}> & {
        _id: unknown;
    }, import("mongoose").Document<any, any, {}> & {
        _id: unknown;
    }, {}, {}>;
    addAmountInVirtualBuffer(data: any): any;
    getVirtualBuffer(id: any): Promise<import("mongoose").Document<any, any, {}> & {
        _id: unknown;
    }>;
    removeBufferData(id: any): import("mongoose").Query<import("mongoose").Document<any, any, {}> & {
        _id: unknown;
    }, import("mongoose").Document<any, any, {}> & {
        _id: unknown;
    }, {}, {}>;
}
