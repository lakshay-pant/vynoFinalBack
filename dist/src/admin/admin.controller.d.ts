/// <reference types="mongoose" />
import { AdminService } from './admin.service';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AdminController {
    private readonly adminService;
    private jwtService;
    private readonly usersService;
    constructor(adminService: AdminService, jwtService: JwtService, usersService: UsersService);
    create(body: any): Promise<{
        status: boolean;
        message: string;
        token?: undefined;
    } | {
        status: boolean;
        token: string;
        message: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<any, any, import("../users/dto/create-user.dto").CreateUserDto> & import("../users/dto/create-user.dto").CreateUserDto & {
        _id: unknown;
    })[]>;
    findOne(query: any, body: any): Promise<{
        status: boolean;
        message: any;
    }>;
    update(id: string, updateAdminDto: UpdateAdminDto): string;
    remove(id: string): string;
}
