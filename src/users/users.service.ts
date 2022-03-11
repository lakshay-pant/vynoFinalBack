import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { RatingReview, RatingReviewSchema } from './schemas/ratingReview.schema';
import { Momo, MomoSchema } from './schemas/momo.schema';
import { v4  } from 'uuid';
import { MOMO } from  './../../config/configuration'
var mongoose = require('mongoose');
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<CreateUserDto>,
    @InjectModel(RatingReview.name) private ratingReviewModel: Model<{}>,
    @InjectModel(Momo.name) private momoModel: Model<{}>
    ) {}

   create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  findAll() {
    const allUser =  this.userModel.find().exec();
    return allUser;
  }

  findData(item) {
    const findUser =  this.userModel.findOne(item).exec();
    return findUser;
  }

  findDataFromId(id) {
   
    const findUser =  this.userModel.findOne({ _id: mongoose.Types.ObjectId(id) }).exec();
    return findUser;
  }

  update(id:any ,updateUserDto: UpdateUserDto) {
    //return updateUserDto;
    
    const updateuser = this.userModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) },{$set: updateUserDto});
    
    return updateuser;

  }

  createMomoCredential(data){
    const createdMomo = new this.momoModel(data);
    return createdMomo.save();
  }
  findMomoCredential(user_id){
    return this.momoModel.findOne({ user_id: mongoose.Types.ObjectId(user_id) }).exec();

  }

  updateOtp(item) {
    return this.userModel.findOneAndUpdate({"phone_number": item.phone_number,'country_code':item.country_code},{$set: {"verify_otp": "1234","updated_at": item.updated_at}});
   
  }

  updateUserWallet(user_id,amount){
      return  this.userModel.findOneAndUpdate({_id: mongoose.Types.ObjectId(user_id)},{$set: {"wallet_amount_user": amount}});
  }

  deleteUser(user_id){
    return this.userModel.findByIdAndDelete(user_id);
  }


  review(data){
    const review = new this.ratingReviewModel(data);
    return review.save();
  }
  
}
