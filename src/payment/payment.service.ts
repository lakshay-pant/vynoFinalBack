import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment, PaymentSchema } from './schemas/payment.schema';
import { History,HistorySchema } from './schemas/history.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<CreatePaymentDto>,
    @InjectModel(History.name) private historyModel: Model<{}>
    ) {}
  create(createPaymentDto: CreatePaymentDto) {
    try{
      const createdlift = new this.paymentModel(createPaymentDto);
      return createdlift.save();
    } catch(e){
      return e;
    }
  }

  historyCreate(data){
    try{
      const createdlift = new this.historyModel(data);
      return createdlift.save();
    } catch(e){
      return e;
    }
  }

 

  findAll() {
    return `This action returns all payment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
