import { CreateSingupDto } from './dto/create-singup.dto';
import { UpdateSingupDto } from './dto/update-singup.dto';
export declare class SingupService {
    create(createSingupDto: CreateSingupDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateSingupDto: UpdateSingupDto): string;
    remove(id: number): string;
}
