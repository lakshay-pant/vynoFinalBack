import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Model } from 'mongoose';
export declare class AddressService {
    private addressModel;
    constructor(addressModel: Model<CreateAddressDto>);
    create(createAddressDto: CreateAddressDto): Promise<import("mongoose").Document<any, any, CreateAddressDto> & CreateAddressDto & {
        _id: unknown;
    }>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAddressDto: UpdateAddressDto): string;
    remove(id: number): string;
}
