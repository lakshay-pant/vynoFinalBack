import { Controller, Get, Post, Res, Body, Patch, Param, Delete, ParseIntPipe, UseInterceptors, UploadedFile, UploadedFiles} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor ,FileFieldsInterceptor ,AnyFilesInterceptor } from "@nestjs/platform-express";
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { HelperService } from '../common/helper';
import { JwtService } from '@nestjs/jwt';
import * as fs from "fs";

@Controller({path:'document',version:'1'})
export class DocumentController {
  constructor(
    private readonly documentService: DocumentService,
    private jwtService: JwtService,
    private helperService:HelperService
    ) {}

  @Post('')
  create(@Body() createDocumentDto: CreateDocumentDto) {
    return this.documentService.create(createDocumentDto);
  }

  @Get('get-account-status')
  async accountStatus(@Body() body) {
    const user_id = body.user.id;
    const findstatus    =  await this.documentService.checkAccountStatusFromId(user_id);
    var data={};
    if(findstatus.length > 0){
      findstatus.map((item,index)=>{
        if(item && item['account_status'] && item['role'] == '0'){
          data['user_status']= item['account_status'];
        }else if(item && item['account_status'] && item['role'] == '1'){
          data['driver_status']= item['account_status'];
        }
      })
      if(!data['user_status']){
        data['user_status'] = ''
      }
      if(!data['driver_status']){
        data['driver_status'] = ''
      }
      return {"status":true,data:data};
    }else{
        return {"status":true,data:{user_status:'',driver_status:''}};
      }
  }

  @Post('update-account-status')
  async updateStatus(@Body() body) {
    const id = body.user.id;
    const role = body.role;
    const status = body.account_status;
    var statusArray = ["pending", "approved", "rejected"];
    var checkStatus = statusArray.includes(status); 

    if(!role || !status || !checkStatus){
      return {status:false , message:"provide valid parameter"};
    }

      const update = await this.documentService.updateInsert(id,role,{account_status:"approved"},'update');
      if(update){
        return {status:true, message:"update successfully"};
      }else{
        return {"status":true,message:"data not found"};
      }
  }

  @Post('/upload-document')
  @UseInterceptors(AnyFilesInterceptor())
  async  uploadFile(@Body() body,@UploadedFiles() files: Array<Express.Multer.File>) {
    try{
      var i = 0;
      var fielddata = [];
      var id = body.id;
      var role = body.role;
      var updateUser;
   
   
      if(Array.isArray(files) && files.length){
        for (let i = 0; i < files.length; i++) {
          fielddata[files[i].fieldname] = files[i].path;
          const extension = files[i].mimetype.split("/")[1];
          fs.rename(files[i].path, files[i].path+'.'+extension, function(err) {
          });
          if(!id || !role){
            console.log("delete"+"  "+files[i].path+'.'+extension)
            fs.unlinkSync(files[i].path+'.'+extension);
          }else{
            const updateUserDocument = {
               [files[i].fieldname] : files[i].path+'.'+extension
               };
               //updateUser =  await this.documentService.updateInsert(id,role,updateUserDocument);
              const checkdata    =  await this.documentService.checkData(id,role);
              if(checkdata){
                updateUser =  await this.documentService.updateInsert(id,role,updateUserDocument,'update');
              }else{
                updateUser =  await this.documentService.updateInsert(id,role,updateUserDocument,'insert');
              }
          }
          
            
             if( i == files.length - 1 ){
                if(!id || !role){
                  return {status:false , message:"provide valid parameter"};
                }else{
                  const documentStatus = {
                    'account_status' : 'pending'
                     };
                  await this.documentService.updateInsert(id,role,documentStatus,'update');
                  
                  return {status:true , message:"document update successfully"};
                }
              
             }
          
      }
      }else{
        return {"status":false,message:"minimum 1 file upload"};
      }
      
    }catch (e) {
          return {"status":false,message:e};
    }  

    }
}
