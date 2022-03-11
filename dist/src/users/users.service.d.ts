import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
export declare class UsersService {
    private userModel;
    private ratingReviewModel;
    private momoModel;
    constructor(userModel: Model<CreateUserDto>, ratingReviewModel: Model<{}>, momoModel: Model<{}>);
    create(createUserDto: CreateUserDto): Promise<import("mongoose").Document<any, any, CreateUserDto> & CreateUserDto & {
        _id: unknown;
    }>;
    findAll(): Promise<(import("mongoose").Document<any, any, CreateUserDto> & CreateUserDto & {
        _id: unknown;
    })[]>;
    findData(item: any): Promise<import("mongoose").Document<any, any, CreateUserDto> & CreateUserDto & {
        _id: unknown;
    }>;
    findDataFromId(id: any): Promise<import("mongoose").Document<any, any, CreateUserDto> & CreateUserDto & {
        _id: unknown;
    }>;
    update(id: any, updateUserDto: UpdateUserDto): import("mongoose").Query<import("mongoose").Document<any, any, CreateUserDto> & CreateUserDto & {
        _id: unknown;
    }, import("mongoose").Document<any, any, CreateUserDto> & CreateUserDto & {
        _id: unknown;
    }, {}, CreateUserDto>;
    createMomoCredential(data: any): Promise<import("mongoose").Document<any, any, {}> & {
        _id: unknown;
    }>;
    findMomoCredential(user_id: any): Promise<import("mongoose").Document<any, any, {}> & {
        _id: unknown;
    }>;
    updateOtp(item: any): import("mongoose").Query<import("mongoose").Document<any, any, CreateUserDto> & CreateUserDto & {
        _id: unknown;
    }, import("mongoose").Document<any, any, CreateUserDto> & CreateUserDto & {
        _id: unknown;
    }, {}, CreateUserDto>;
    updateUserWallet(user_id: any, amount: any): import("mongoose").Query<import("mongoose").Document<any, any, CreateUserDto> & CreateUserDto & {
        _id: unknown;
    }, import("mongoose").Document<any, any, CreateUserDto> & CreateUserDto & {
        _id: unknown;
    }, {}, CreateUserDto>;
    deleteUser(user_id: any): import("mongoose").Query<import("mongoose").Document<any, any, CreateUserDto> & CreateUserDto & {
        _id: unknown;
    }, import("mongoose").Document<any, any, CreateUserDto> & CreateUserDto & {
        _id: unknown;
    }, {}, CreateUserDto>;
    review(data: any): Promise<import("mongoose").Document<any, any, {}> & {
        _id: unknown;
    }>;
}
