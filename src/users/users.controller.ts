import { Controller, Get, Post, Res, Body, Patch, Param, Delete, ParseIntPipe, UseInterceptors, UploadedFile, UploadedFiles} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor ,FileFieldsInterceptor ,AnyFilesInterceptor } from "@nestjs/platform-express";
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserSchema } from './schemas/user.schema';
import { HelperService } from '../common/helper';
import * as moment from 'moment';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import * as fs from "fs";
import { time } from 'console';
import { connected } from 'process';
const mime = require('mime');
var mongoose = require('mongoose');
@Controller({path:'user',version:'1'})
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    private helperService:HelperService
    ) {
  }


  @Get('allUser')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('account-status')
  async accountStatus(@Body() body) {
    const id = body.user.id;
    const finduser = await this.usersService.findDataFromId(id);
 
      if(finduser && finduser['account_status']){
        return {status:true,data:{account_status:finduser['account_status']}};
      }else{
        return {"status":true,data:{account_status:''}};
      }
  }

  @Get('my-profile')
  async myProfile(@Body() body) {
    const id = body.user.id;
    const finduser = await this.usersService.findDataFromId(id);
 
      if(finduser){
        return {status:true,data:finduser};
      }else{
        return {"status":false,message:"User not found"};
      }
  }

  @Post('/update')
  async updateUser(@Body() updateUserDto: UpdateUserDto) {
      try{
        if(updateUserDto.hasOwnProperty('profile')){
          var imgBase64 = updateUserDto['profile'];
          const uploadfile = this.helperService.base64ImageUpload(imgBase64);
          
          if(uploadfile.status != true){
            return {status:true,message:"invalid format of images"};
          }else{
            updateUserDto['profile'] =  uploadfile.path;
          }
        }
       
        const id  = updateUserDto['user'].id;
        delete updateUserDto['user'];
        delete updateUserDto['otp'];
        delete updateUserDto['phone_number']; 
        delete updateUserDto['account_verify']; 
        const updateUser =  await this.usersService.update(id,updateUserDto);
        if(updateUser){
          const finduser = await this.usersService.findDataFromId(id);
          return {status:true,message:"updated successfully",data:{profile:finduser['profile']}};
        }else{
          return {status:true,message:"User not found"};
        }
      }catch (e) {
        return {"status":false,message:e};
       }
  }
        
          
  @Post('/ratingReview')
  async ratingReview(@Body() body) {
      try{
          var user_id        =    body.user.id;
          var to             =    body.to;
          var rating         =    body.rating;
          var rating_for     =    body.rating_for;
          var action         =    ["user", "driver"];
          body['created_at'] =    moment().format('DD/MM/YYYY h:mm A'); 
          delete body.user;
          if(!to || !rating || !action.includes(rating_for)) {
            return {"status":false,message:'provide valid parameter'};
          }else{ 
          
            const finduser = await this.usersService.review(body);
            if(finduser){
              return {status:true,message:"successfully"}
            }else{
              return {status:true,message:"went somthing wrong"};
            }
            
          }
      }catch (e) {
        return {"status":false,message:e};
       }
  }

  @Get('my-wallet')
  async myWallet(@Body() body,@Param('role') roles: string) {
    const user_id = body.user.id;
    const finddata =  await this.usersService.findDataFromId(user_id);
    if(finddata){
      return  {"status":true,wallet_user:finddata['wallet_amount_user'],wallet_driver:finddata['wallet_amount_driver']};
    }  
  }



  

  // @Post('/upload-document')
  // @UseInterceptors(AnyFilesInterceptor())
  // async  uploadFile(@Body() body,@UploadedFiles() files: Array<Express.Multer.File>) {
  //   try{
    
  //     var i = 0;
  //     var fielddata = [];
  //     var id = body.id;
  //     var updateUser;
   
  //     if(Array.isArray(files) && files.length){
  //       for (let i = 0; i < files.length; i++) {
  //         fielddata[files[i].fieldname] = files[i].path;
  //         const extension = files[i].mimetype.split("/")[1];
            
  //         fs.rename(files[i].path, files[i].path+'.'+extension, function(err) {
              
  //         });
  //         if(!id){
  //           console.log("delete"+"  "+files[i].path+'.'+extension)
  //           fs.unlinkSync(files[i].path+'.'+extension);
  //         }else{
  //           const updateUserDocument = {
  //             [files[i].fieldname] : files[i].path+'.'+extension
  //              };
  //              updateUser =  await this.usersService.update(id,updateUserDocument);
  //         }
          
            
  //            if( i == files.length - 1 ){
  //               if(!id){
  //                 return {status:false , message:"provide valid parameter"};
  //               }else{
  //                 const documentStatus = {
  //                   'account_status' : 'pending'
  //                    };
  //                 await this.usersService.update(id,documentStatus);
                  
  //                 return {status:true , message:"document update successfully"};
  //               }
              
  //            }
          
  //     }
  //     }else{
  //       return {"status":false,message:"minimum 1 file upload"};
  //     }
      
  //   }catch (e) {
  //         return {"status":false,message:e};
  //   }  

  //   }



//   @Get(':phone')
//  async findOne(@Param('phone', ParseIntPipe) phone: string){
//     var getData = await this.usersService.findOne(+phone);
//     if(getData){
//       return {status:'true',data:getData,'message':"find"};
//     }else{
//       return {status:'true',data:getData,'message':"not found"};
//     }
   
//   }

  
//   @Patch(':phone')
//   async  update(@Param('phone') phone: string, @Body() updateUserDto: UpdateUserDto) {
  
//      const updateUser =  await this.usersService.update(+phone, updateUserDto);
//      if(updateUser){
//       return {status:'true',data:updateUser,'message':"update successfully"};
//     }else{
//       return {status:'true',data:updateUser,'message':"user not found"};
//     }
//     console.log(updateUserDto);
//     //;
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.usersService.remove(+id);
//   }
}
