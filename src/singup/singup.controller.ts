import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SingupService } from './singup.service';
import { CreateSingupDto } from './dto/create-singup.dto';
import { UpdateSingupDto } from './dto/update-singup.dto';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { User, UserSchema } from '../users/schemas/user.schema';
import { Request, Response, NextFunction } from 'express';
import { HelperService } from '../common/helper';
import { v4  } from 'uuid';
import * as moment from 'moment';
import { ERR_MSG, MOMO} from  './../../config/configuration'
let fetch = require('node-fetch');
import { JwtService } from '@nestjs/jwt';
var mongoose = require('mongoose');
@Controller({path:'signup',version:'1'})
export class SingupController {
  constructor(
    private readonly singupService: SingupService,
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    private helperService:HelperService
    ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
     try{
     
      if(!createUserDto.hasOwnProperty('phone_number') || !createUserDto.hasOwnProperty('country_code')){
        return {status:false,message:"provide Valid parameter"};
      }
      const checkUserExits = await this.usersService.findData({phone_number:createUserDto['phone_number'],country_code:createUserDto['country_code']});
      const date= moment().format('DD/MM/YYYY HH:mm:ss');
        if(checkUserExits){
          createUserDto['updated_at'] = date;
          var updateUser =  await this.usersService.updateOtp(createUserDto);
           updateUser = JSON.parse(JSON.stringify(updateUser));
          return {status:true,id:updateUser._id,message:"user updated successfully"};
        }else{
         
          createUserDto['first_name'] = '';
          createUserDto['last_name'] = '';
          createUserDto['email'] = '';
          createUserDto['gender'] = '';
          createUserDto['dob'] = '';
          createUserDto['profession'] = '';
          createUserDto['driving_licence'] = '';
          createUserDto['cni_number'] = '';
          createUserDto['created_at'] = date;
          createUserDto['updated_at'] = '';
          createUserDto['verify_otp'] = '1234';
          createUserDto['role'] = '1';
          createUserDto['account_verify'] = ''; 
          createUserDto['account_status'] = '';
          var createUser = await this.usersService.create(createUserDto);
          createUser = JSON.parse(JSON.stringify(createUser));
          if(createUser){
           var createMomoCredential =  await this.createMomoAccountAndSaveCredential(createUser._id);
           createMomoCredential = JSON.parse(JSON.stringify(createMomoCredential));
           if(createMomoCredential['_id']){
             return {status:true,id:createUser._id,message:"user created successfully"};
           }else{
            var deleteUser = await this.usersService.deleteUser(createUser._id);
            return {status:false,message:ERR_MSG};
           }
          }
          
        }
      }catch (e){
        return {status:false,message:e};
      }  
  }

  async createMomoAccountAndSaveCredential(user_id){
    var url = MOMO.MOMO_URL+ '/v1_0/apiuser';
    var uuidv4 = v4();
    var header = {
      'Content-Type'   : 'application/json','Ocp-Apim-Subscription-Key':MOMO.OcpApimSubscriptionKey,
      'X-Reference-Id'           :uuidv4
    };
    // for creating user in momo
     await fetch(url, {
      method: 'POST',
      headers: header,
      body: JSON.stringify({
        "providerCallbackHost": "string"
      })
    }).then(async response => {
      if(response.status == 201){
        var url =  MOMO.MOMO_URL+ '/v1_0/apiuser/'+uuidv4+'/apikey';
        var header = {
          'Ocp-Apim-Subscription-Key':MOMO.OcpApimSubscriptionKey
        };
        const response = await fetch(url, {
          method: 'POST',
          headers: header
        }).then(async responseData => {
          const content    = await responseData.json();
          const username   = uuidv4;
          const password   = content.apiKey;
          const data = {
            'user_id'    :user_id,
            'username'   :uuidv4,
            'password'   :password,
            'created_at' :moment().format('DD/MM/YYYY h:mm A')
          };
          const createMomoCredential  =  await this.usersService.createMomoCredential(data);
          return createMomoCredential;
        })
      }
    });
  }

  @Post('/verify-otp')
  async verifyotp(req: Request, res: Response,@Body() data) {
        try {
          if(!data.hasOwnProperty('id') || !data.hasOwnProperty('otp')  ){
            return {status:false,message:"provide Valid parameter"};
          }

          const verifyotp =  await this.usersService.findData({ _id: mongoose.Types.ObjectId(data.id) ,verify_otp:data.otp});
          if(verifyotp){
            const updatefcm =  await this.usersService.update(data.id,{'fcm':data.fcm});
            const payload = { id: data.id};
            const jwtToken = await this.jwtService.signAsync(payload);
            const userdata = this.helperService.removeUnderscoreFromcolumn(verifyotp);
            return {status:true,token: jwtToken,data:userdata,message:"otp verify successfully"};
          }else{
            return {status:false,message:"otp not match"};
          }
      }catch (err) {
        return{ status: false,message:'invalid token' };
      }

}

}
