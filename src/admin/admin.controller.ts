import { Controller, Get, Post, Body, Patch, Param, Delete, Req ,Query} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
@Controller({path:'admin',version:'1'})
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private jwtService: JwtService,
    private readonly usersService: UsersService,
    ) {}

  @Post('login')
  async create(@Body() body) {
    
    if(!body.hasOwnProperty('user_name') || !body.hasOwnProperty('password')){
      return {status:false,message:"provide Valid parameter"};
    }else if(body['user_name'] == 'admin@vyno.com' && body['password'] == '!@#$%^'){
      const payload = { user_name: 'admin@vyno.com'};
      const jwtToken = await this.jwtService.signAsync(payload);
      return {status:true,token: jwtToken,message:"login successfully"};
    }else{
      return {status:false,message:"login failed"};
    } 
    
  }

  @Get('get-user')
  async findAll() {
    return await this.usersService.findAll();
   }

  @Get('update-account-status')
  async findOne(@Query() query,@Body() body) {
    try{
        const status = ["pending", "approved", "rejected"];
        if(query.id && body.account_status){
          if(status.includes(body.account_status)){
              const finduser = await this.usersService.findDataFromId(query.id);
              const documentStatus = {
                'account_status' : body.account_status
                 };
                 
            var updateStatus = await this.usersService.update(query.id,documentStatus);
            if(updateStatus){
              return {status:true,message:"status change successfully"};
            }

          }else{
            return {status:false,message:`your status doesn't match our records`};
          }
            
        }else{
          return {status:false,message:"provide Valid parameter"};
        }
    } catch (e){
      return {status:false,message:e};
    }
  }  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
