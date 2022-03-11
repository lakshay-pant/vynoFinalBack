import { PaymentService } from './payment.service';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { UsersService } from '../users/users.service';
import { HelperService } from '../common/helper';
export declare class PaymentController {
    private readonly paymentService;
    private readonly usersService;
    private helperService;
    constructor(paymentService: PaymentService, usersService: UsersService, helperService: HelperService);
    create(body: any): Promise<any>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePaymentDto: UpdatePaymentDto): string;
    remove(id: string): string;
}
