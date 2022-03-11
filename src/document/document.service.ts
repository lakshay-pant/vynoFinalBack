import { Injectable } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Documents, DocumentsSchema } from './schemas/document.schema';
var mongoose = require('mongoose');

@Injectable()
export class DocumentService {
  constructor(
    @InjectModel(Documents.name) private documentsModel: Model<CreateDocumentDto>
    ) {}
  create(createDocumentDto: CreateDocumentDto) {
    return 'This action adds a new document';
  }

  findAll() {
    return `This action returns all document`;
  }

  findOne(id: number) {
    return `This action returns a #${id} document`;
  }
  checkData(id,role){
    const checkData = this.documentsModel.findOne( {$and: [{'user_id':  mongoose.Types.ObjectId(id)},{'role': role}]});
    return checkData;
  }
  checkAccountStatusFromId(user_id){
    const checkData = this.documentsModel.find({'user_id':  mongoose.Types.ObjectId(user_id)});
    return checkData;
  }

  updateInsert(id,role,data,type) {
      data['user_id'] = id;
      data['role'] = role;
    if(type == 'insert'){
      const uploadUser = new this.documentsModel(data);
      return uploadUser.save();
    }else if(type == 'update'){
      const updateuser = this.documentsModel.findOneAndUpdate({$and: [{'user_id':  mongoose.Types.ObjectId(id)},{'role': role}]},{$set: data});
      return updateuser;
    }
    
  }

  remove(id: number) {
    return `This action removes a #${id} document`;
  }
}
