import { SingupService } from './singup.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Request, Response } from 'express';
import { HelperService } from '../common/helper';
import { JwtService } from '@nestjs/jwt';
export declare class SingupController {
    private readonly singupService;
    private readonly usersService;
    private jwtService;
    private helperService;
    constructor(singupService: SingupService, usersService: UsersService, jwtService: JwtService, helperService: HelperService);
    create(createUserDto: CreateUserDto): Promise<{
        status: boolean;
        id: any;
        message: string;
    } | {
        status: boolean;
        message: any;
        id?: undefined;
    }>;
    createMomoAccountAndSaveCredential(user_id: any): Promise<void>;
    verifyotp(req: Request, res: Response, data: any): Promise<{
        status: boolean;
        message: string;
        token?: undefined;
        data?: undefined;
    } | {
        status: boolean;
        token: string;
        data: any;
        message: string;
    }>;
}
