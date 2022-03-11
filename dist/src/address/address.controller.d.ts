import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
export declare class AddressController {
    private readonly addressService;
    constructor(addressService: AddressService);
    create(body: any, createAddressDto: CreateAddressDto): Promise<{
        status: boolean;
        message: any;
    }>;
    findAll(): string;
}
