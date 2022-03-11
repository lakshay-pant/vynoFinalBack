/// <reference types="mongoose" />
import { LiftService } from './lift.service';
import { CreateLiftDto } from './dto/create-lift.dto';
import { HelperService } from '../common/helper';
import { UsersService } from '.././users/users.service';
export declare class LiftController {
    private readonly liftService;
    private helperService;
    private readonly usersService;
    constructor(liftService: LiftService, helperService: HelperService, usersService: UsersService);
    create(body: any): Promise<{
        status: boolean;
        message: any;
    }>;
    Update(body: any): Promise<{
        status: boolean;
        message: any;
    }>;
    fetchMyLift(body: any): Promise<{
        status: boolean;
        data: {
            inter: any[];
            intra: any[];
        };
    }>;
    SearchLift(body: any): Promise<{
        status: boolean;
        data: any[];
        message: string;
    } | {
        status: boolean;
        data: any[];
        message?: undefined;
    } | {
        status: boolean;
        message: any;
        data?: undefined;
    }>;
    findAll(): Promise<(import("mongoose").Document<any, any, CreateLiftDto> & CreateLiftDto & {
        _id: unknown;
    })[]>;
    findSinfetchgleLift(id: any): Promise<{
        status: boolean;
        data: any;
        message?: undefined;
    } | {
        status: boolean;
        message: any;
        data?: undefined;
    }>;
    findOne(body: any): Promise<{
        status: boolean;
        message: any;
    }>;
    getStaticImageRoute(body: any): Promise<{
        status: boolean;
        url: string;
        message?: undefined;
    } | {
        status: boolean;
        message: any;
        url?: undefined;
    }>;
    getPlaceApi(): Promise<any>;
    LiftRequestFromUSer(body: any): Promise<{
        status: boolean;
        message: any;
    }>;
    fetchUserRequest(body: any, roles: string): Promise<{
        status: boolean;
        data: {
            inter: any[];
            intra: any[];
            all: any[];
        };
        message?: undefined;
    } | {
        status: boolean;
        message: any;
        data?: undefined;
    }>;
    accepctRejectLiftRequst(body: any): Promise<{
        status: boolean;
        message: string;
    }>;
    addAmountInVirtualBuffer(user_id: any, booking_id: any, amount: any): Promise<import("mongoose").Document<any, any, import("../users/dto/create-user.dto").CreateUserDto> & import("../users/dto/create-user.dto").CreateUserDto & {
        _id: unknown;
    }>;
    myBooking(body: any): Promise<{
        status: boolean;
        data: any;
        message?: undefined;
    } | {
        status: boolean;
        message: any;
        data?: undefined;
    }>;
    activeLift(body: any, id: any): Promise<{
        status: boolean;
        message: any;
    }>;
    getBookingUserInfo(body: any): Promise<{
        status: boolean;
        user: {
            driver_info: string | any[];
        };
        driver: any[];
        message?: undefined;
    } | {
        status: boolean;
        message: any;
        user?: undefined;
        driver?: undefined;
    }>;
    myNotifications(body: any): Promise<{
        status: boolean;
        message: string;
        data?: undefined;
    } | {
        status: boolean;
        data: any;
        message?: undefined;
    }>;
    deleteNotifications(body: any): Promise<{
        status: boolean;
        message: string;
    }>;
    createVirtualLift(body: any): Promise<{
        status: boolean;
        message: any;
    }>;
    getVirtualLift(body: any): Promise<{
        status: boolean;
        data: {
            inter: any[];
            intra: any[];
        };
        message?: undefined;
    } | {
        status: boolean;
        message: any;
        data?: undefined;
    }>;
    getSingleVirtualLift(body: any): Promise<{
        status: boolean;
        data: import("mongoose").Document<any, any, {}> & {
            _id: unknown;
        };
        message?: undefined;
    } | {
        status: boolean;
        message: any;
        data?: undefined;
    }>;
    virtualLiftAcceptUser(body: any): Promise<{
        status: boolean;
        message: string;
    }>;
    virtualLiftRejectUser(body: any): Promise<{
        status: boolean;
        message: string;
    }>;
    virtualLiftAcceptReject(body: any): Promise<{
        status: boolean;
        message: any;
    }>;
    cancleBooking(body: any): Promise<{
        status: boolean;
        message: any;
    }>;
    createAndSendNotifications(notificationData: any, driver_id: any, user_id: any, is_create_notification?: boolean): Promise<void>;
}
