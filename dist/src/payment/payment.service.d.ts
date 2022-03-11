import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Model } from 'mongoose';
export declare class PaymentService {
    private paymentModel;
    private historyModel;
    constructor(paymentModel: Model<CreatePaymentDto>, historyModel: Model<{}>);
    create(createPaymentDto: CreatePaymentDto): any;
    historyCreate(data: any): any;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePaymentDto: UpdatePaymentDto): string;
    remove(id: number): string;
}
