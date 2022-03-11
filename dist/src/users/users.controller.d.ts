/// <reference types="mongoose" />
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HelperService } from '../common/helper';
import { JwtService } from '@nestjs/jwt';
export declare class UsersController {
    private readonly usersService;
    private jwtService;
    private helperService;
    constructor(usersService: UsersService, jwtService: JwtService, helperService: HelperService);
    findAll(): Promise<(import("mongoose").Document<any, any, CreateUserDto> & CreateUserDto & {
        _id: unknown;
    })[]>;
    accountStatus(body: any): Promise<{
        status: boolean;
        data: {
            account_status: any;
        };
    }>;
    myProfile(body: any): Promise<{
        status: boolean;
        data: import("mongoose").Document<any, any, CreateUserDto> & CreateUserDto & {
            _id: unknown;
        };
        message?: undefined;
    } | {
        status: boolean;
        message: string;
        data?: undefined;
    }>;
    updateUser(updateUserDto: UpdateUserDto): Promise<{
        status: boolean;
        message: string;
        data: {
            profile: any;
        };
    } | {
        status: boolean;
        message: any;
        data?: undefined;
    }>;
    ratingReview(body: any): Promise<{
        status: boolean;
        message: any;
    }>;
    myWallet(body: any, roles: string): Promise<{
        status: boolean;
        wallet_user: any;
        wallet_driver: any;
    }>;
}
