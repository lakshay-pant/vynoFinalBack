import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import bodyParser from 'body-parser';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';


@Controller({path:'address',version:'1'})
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post('add-address')
  async create(@Body() body, createAddressDto: CreateAddressDto) {
    try{
     createAddressDto = body;
     createAddressDto['user_id'] = createAddressDto['user'].id;
         delete createAddressDto['user'];
    const addAddress = await this.addressService.create(createAddressDto);
    if(addAddress){
      return {status:true,message:"created successfully"};
    }
    
    }catch (e) {
      if(e.hasOwnProperty('errors')){
        return {"status":false,message:'validation error'};
      }else{
        return {"status":false,message:e};
      }
      
     }
  }

  @Get()
  findAll() {
    return this.addressService.findAll();
  }

}
