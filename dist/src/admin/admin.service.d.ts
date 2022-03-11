import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UsersService } from '../users/users.service';
export declare class AdminService {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createAdminDto: CreateAdminDto): string;
    findAll(): Promise<void>;
    findOne(id: number): string;
    update(id: number, updateAdminDto: UpdateAdminDto): string;
    remove(id: number): string;
}
