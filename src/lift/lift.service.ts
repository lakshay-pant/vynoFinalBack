import { Injectable } from '@nestjs/common';
import { CreateLiftDto } from './dto/create-lift.dto';
import { UpdateLiftDto } from './dto/update-lift.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lift, LiftSchema } from './schemas/lift.schema';
import { LiftRequest, LiftRequestSchema } from './schemas/liftRequest.schema';
import { LiftBooking, LiftBookingSchema } from './schemas/liftBooking.schema';
import { LiftNotification, LiftNotificationSchema } from './schemas/liftNotification.schema';
import { VirtualLift, VirtualLiftSchema } from './schemas/virtualLift.schema';
import { VirtualBuffer, VirtualBufferSchema } from './schemas/virtualBuffer.schema';
import {GOOGEL_MAP_KEY, PUSH_NOTIFICATION , FIREBASE_SERVER_KEY} from '../../config/configuration'
var FCM = require('fcm-node');
var serverKey = FIREBASE_SERVER_KEY; //put your server key here
var fcm = new FCM(serverKey);
var moment = require('moment');
var mongoose = require('mongoose');
@Injectable()
export class LiftService {
  constructor(
    @InjectModel(Lift.name) private liftModel: Model<CreateLiftDto>,
    @InjectModel(LiftRequest.name) private liftRequestModel: Model<{}>,
    @InjectModel(LiftBooking.name) private liftBookingModel: Model<{}>,
    @InjectModel(LiftNotification.name) private liftNotification: Model<{}>,
    @InjectModel(VirtualLift.name) private virtualLift: Model<{}>,
    @InjectModel(VirtualBuffer.name) private virtualBufferModel: Model<{}>,
    ) {}
  create(createLiftDto: CreateLiftDto) {
    try{
      const createdlift = new this.liftModel(createLiftDto);
      return createdlift.save();
    } catch(e){
      return e;
    }
  }

  findAll() {
    const alllift =  this.liftModel.find().exec();
    return alllift;
  }
  myAllList(id) {
    const lift =  this.liftModel.find({ user_id: mongoose.Types.ObjectId(id) }).exec();
    return lift;
  }

  findOne(id: any) {
    const lift =  this.liftModel.findOne({_id: mongoose.Types.ObjectId(id) }).exec();
    return lift;
  }

  activeBooking(id: any) {
    return this.liftBookingModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) },{$set: {'status':'active'}})
  }
  fetchTodayBooking(user_id,date){
    const mylift =  this.liftBookingModel.aggregate([
      { $match: { "date": date } },
      { $match: {$or: [{'user_id': {$eq: mongoose.Types.ObjectId(user_id)}}, {'driver_id': mongoose.Types.ObjectId(user_id)}]}, },
      {
        $lookup:
          {
            from: 'users',
            localField: 'driver_id',
            foreignField: '_id',
            as: 'rider'
          }
     },
     {
      $lookup:
        {
          from: 'users',
          localField: 'user_id',
          foreignField: '_id',
          as: 'user'
        }
   }
     
  ]);
  return mylift;
  }

  deleteLift(id){
      const deletelift =  this.liftModel.findByIdAndRemove(id);
      return deletelift;
  }
 

  searchLift(query,user_id){
  const dayname = moment(query.occasional, "D MMM YYYY").format("dddd");
  const lift =  this.liftModel.find({
          $and : [
            {'user_id': {$ne : mongoose.Types.ObjectId(user_id)}},
            {"type": query.type},
            {"to.address": query.to.address},
            {"from.address": query.from.address},
            {"passenger": query.passenger},
            {$or: [{'pick_preferences.gender': {$eq: query.pick_preferences.gender}}, {'pick_preferences.gender': 'Any'}]},
            {$or: [{'pick_preferences.air_condition': {$eq: query.pick_preferences.air_condition}}, {'pick_preferences.gender': 'Any'}]},
            {$or: [{'pick_preferences.pvt_lift': {$eq: query.pick_preferences.pvt_lift}}, {'pick_preferences.pvt_lift': 'Any'}]},
            {$or: [{'pick_preferences.car': {$eq: query.pick_preferences.car}}, {'pick_preferences.car': 'Any'}]},
          ]
      } ).exec();

      return lift;
  }

  update(id: any, updateLiftDto: UpdateLiftDto) {
    return this.liftModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) },{$set: updateLiftDto})
  }

  checkRequestExits(data){
    try{
      const lift =  this.liftRequestModel.findOne({
        $and : [
            {"user_id": mongoose.Types.ObjectId(data.user_id)},
            {"lift_id": mongoose.Types.ObjectId(data.lift_id)},
            {"driver_id": mongoose.Types.ObjectId(data.driver_id)},
            {"driver_status": ''},
        ]
    } ).exec();
    return lift;

    }catch(e){
      return e;
    }
  }

  createdLiftRequest(data){
    try{
      const createdliftRequest = new this.liftRequestModel(data);
      return createdliftRequest.save();
    } catch(e){
      return e;
    }
  }

  myLiftUserRequest(id){
      try{
      const mylift =  this.liftRequestModel.aggregate([
          { $match: { "user_id": mongoose.Types.ObjectId(id) } },
          {
            $lookup:
              {
                from: 'users',
                localField: 'driver_id',
                foreignField: '_id',
                as: 'rider'
              }
         },
         {
          $lookup:
            {
              from: 'lifts',
              localField: 'lift_id',
              foreignField: '_id',
              as: 'lift'
            }
       }
         
      ]);
      return mylift;
    } catch(e){
      return e;
    }
  }

  myVirtualLiftRequest(id){
    try{
    const mylift =  this.virtualLift.aggregate([
      { $match: { "user_id": mongoose.Types.ObjectId(id) } },
      {
        $lookup:
          {
            from: 'users',
            localField: 'user_id',
            foreignField: '_id',
            as: 'user'
          }
     }
  ]);
  return mylift;
    } catch(e){
      return e;
    }
  }

  myLiftDriverRequest(id){
    try{
    const mylift =  this.liftRequestModel.aggregate([
        { $match: { "driver_id": mongoose.Types.ObjectId(id) } },
        {
          $lookup:
            {
              from: 'users',
              localField: 'user_id',
              foreignField: '_id',
              as: 'rider'
            }
       },
       {
        $lookup:
          {
            from: 'lifts',
            localField: 'lift_id',
            foreignField: '_id',
            as: 'lift'
          }
     }
       
    ]);
    return mylift;
  } catch(e){
    return e;
  }
}

actionLiftRequest(query){
  return this.liftRequestModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(query.lift_request_id) },{$set: {'driver_status':query.action}})
}

createdLiftBooking(query){
  try{
    const createdLiftBooking = new this.liftBookingModel(query);
    return createdLiftBooking.save();
  } catch(e){
    return e;
  }
}

cancleBooking(data){
    try{
      return this.liftBookingModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(data.booking_id) },{$set: {'cancle_by':data.myrole,'is_cancle':true}})
    } catch(e){
      return e;
    }
}



myBookingData(id,role){
  try{
    var condition;
    var lookup;
    if(role == 'driver'){
       condition = { "driver_id": mongoose.Types.ObjectId(id) };
       lookup    =  {$lookup:{
                    from: 'users',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'user'
                    }
              };
    }else if(role == 'user'){
       condition = { "user_id": mongoose.Types.ObjectId(id) };
       lookup    = { $lookup:
                    {
                      from: 'users',
                      localField: 'driver_id',
                      foreignField: '_id',
                      as: 'driver'
                    }
          };
    }
    const fetchNotificationDriver =  this.liftBookingModel.aggregate([
      { $match: condition },
      lookup,
  ]);
  return fetchNotificationDriver;
  } catch(e){
    return e;
  }
}

createdNotification(data){
  try{
    const createdNotification = new this.liftNotification(data);
    return createdNotification.save();
  } catch(e){
    return e;
  }
}

fetchNotificationUser(userid){
  try{
    const fetchNotificationUser =  this.liftNotification.aggregate([
        { $match: { "notify_from": 'driver' } },
        { $match: {"user_id": mongoose.Types.ObjectId(userid)} },
        {
          $lookup:
            {
              from: 'users',
              localField: 'driver_id',
              foreignField: '_id',
              as: 'rider'
            }
       },
       {"$sort":{"_id":-1}}
     ]);
     return fetchNotificationUser;
  } catch(e){
    return e;
  }
}

fetchNotificationDriver(driverid){
      try{
        const fetchNotificationDriver =  this.liftNotification.aggregate([
          { $match: { "notify_from": 'user' } },
          { $match: {"driver_id": mongoose.Types.ObjectId(driverid)} },
          {
            $lookup:
              {
                from: 'users',
                localField: 'user_id',
                foreignField: '_id',
                as: 'user'
              }
        },
        {"$sort":{"_id":-1}}
      ]);
      return fetchNotificationDriver;
      } catch(e){
        return e;
      }
  }

  deleteAllNotification(notification_id){
   
    // Site.deleteMany({ userUID: uid, id: { $in: [10, 2, 3, 5]}}, function(err) {})

  const  deleteNotifications =  this.liftNotification.deleteMany({_id: { $in: notification_id}});

    return deleteNotifications;
    
  }

  //virtual lift

  createVirtualLift(data) {
    try{
      const createdlift = new this.virtualLift(data);
      return createdlift.save();
    } catch(e){
      return e;
    }
  }

  getVirtualLiftDetails(id){
    const lift =  this.virtualLift.findOne({_id: mongoose.Types.ObjectId(id) }).exec();
    return lift;
  }

  updateVirtualLiftDetails(id,data){
    return this.virtualLift.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) },{$set: {'rejected_id':data}})
  }


  getVirtualLift(user_id){
    try{
      const allVirtualLift =  this.virtualLift.aggregate([
        {"user_id": {$ne: mongoose.Types.ObjectId(user_id)}},
        {
          $lookup:
            {
              from: 'users',
              localField: 'user_id',
              foreignField: '_id',
              as: 'user'
            }
       },
       {"$sort":{"_id":-1}}
     ]).exec();
      //const allVirtualLift =  this.virtualLift.find().exec();
      return allVirtualLift;
    } catch(e){
      return e;
    }
  }

  acceptVirtualLiftFromDriver(lift_id,data){
    return this.virtualLift.findOneAndUpdate({ _id: mongoose.Types.ObjectId(lift_id) },{$set: data});
  }

  removeVirtualLiftFromuser(lift_id){
    return this.virtualLift.updateOne(
      { $unset: { accepted_id: ""} }
   )
  }

  approvalVirtualLift(lift_id){
    return this.virtualLift.findOneAndUpdate({ _id: mongoose.Types.ObjectId(lift_id) },{$set: {'approval':true}});
  }
 
//  virtual buffer
  
  addAmountInVirtualBuffer(data){
    try{
      const addAmount = new this.virtualBufferModel(data);
      return addAmount.save();
    } catch(e){
      return e;
    }
  }

  getVirtualBuffer(id){
    const bufferData =  this.virtualBufferModel.findOne({booking_id: mongoose.Types.ObjectId(id) }).exec();
    return bufferData;
  }

  removeBufferData(id){
    const deleteData =  this.virtualBufferModel.findByIdAndDelete(id);
    return deleteData;

  }

  //virtual buffer
}
