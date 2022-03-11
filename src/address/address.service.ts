import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Address, AddressSchema } from './schemas/address.schema';
var mongoose = require('mongoose');
@Injectable()
export class AddressService {
  constructor(@InjectModel(Address.name) private addressModel: Model<CreateAddressDto>) {}

  create(createAddressDto: CreateAddressDto) {

          const createdAddress = new this.addressModel(createAddressDto);
          return createdAddress.save();
    
  }

  findAll() {
    return `This action returns all address`;
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
