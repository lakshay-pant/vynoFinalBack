import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LiftService } from './lift.service';
import { CreateLiftDto } from './dto/create-lift.dto';
import { UpdateLiftDto } from './dto/update-lift.dto';
import { HelperService } from '../common/helper';
import { UsersService } from '.././users/users.service';
import * as moment from 'moment';
import bodyParser from 'body-parser';
import {GOOGEL_MAP_KEY, PUSH_NOTIFICATION , FIREBASE_SERVER_KEY} from '../../config/configuration'
import { map } from 'rxjs';
var mongoose = require('mongoose');
let fetch = require('node-fetch');
var Distance = require('geo-distance');
var FCM = require('fcm-node');
var serverKey = FIREBASE_SERVER_KEY; //put your server key here
var fcm = new FCM(serverKey);
@Controller({path:'lift',version:'1'})
export class LiftController {
  constructor(
    private readonly liftService: LiftService,
    private helperService:HelperService,
    private readonly usersService: UsersService,
    ) {}

  @Post('create-lift')
  async create(@Body() body) {
    try {
      const data = body;
      const id = body.user.id;
      delete data.user;
      data['user_id'] = id;

      var to = {lat: body.to.lat,lon: body.to.long};
      var from = {lat: body.from.lat,lon: body.from.long};
      var distanceCalculate = Distance.between(to, from);
      body['distance'] = distanceCalculate.human_readable().distance;

      const createlift = await this.liftService.create(data);
      if(createlift){
        return {status:true,message:"lift created successfully"};
      }else{
        return {status:true,message:"invalid argument"};
      }
    } catch(e){
      if(e.hasOwnProperty('errors')){
        return {"status":false,message:e};
      }else{
        return {"status":false,message:e};
      }
    }
  }

  @Post('update-lift')
  async Update(@Body() body) {
    try {
      const data = body;
      const usre_id = body.user.id;
      delete data.user;
      data['user_id']=usre_id;
      const lift_id = body.id;
      if(!body.id){
        return {"status":false,message:'provide valid parameter'};
      }
      const updatelift = await this.liftService.update(lift_id,data);
      if(updatelift){
        return {status:true,message:"lift updated successfully"};
      }else{
        return {status:true,message:"invalid argument"};
      }
    } catch(e){
      if(e.hasOwnProperty('errors')){
        return {"status":false,message:e};
      }else{
        return {"status":false,message:e};
      }
    }
  }

@Get('fetch-my-lift')
async fetchMyLift(@Body() body) {
    const myid = body.user.id;
    const inter = [];
    const intra = [];
    const fetchlift = await this.liftService.myAllList(myid);
        fetchlift.map((item,index)=>{
          console.log(item['type']+",,"+index);
          if(item['type'] == 'intra'){
            const data ={
              "id"        : item['_id'],
              "passenger" : item['passenger'],
              "price"     : item['price'],
              "to"        : item['to']['address'],
              "from"      : item['from']['address'],
              "is_active" : item['is_active'],
              "is_virtual": (item['is_virtual']) ? item['is_virtual'] : false
            };
            intra.push(data);
          }else if(item['type'] == 'inter'){
            const data ={
              "id": item['_id'],
              "passenger": item['passenger'],
              "price": item['price'],
              "to": item['to']['address'],
              "from": item['from']['address'],
              "is_active": item['is_active'],
              "is_virtual": (item['is_virtual']) ? item['is_virtual'] : false
            };
            inter.push(data);
          }
        })
    
     return {"status":true,data:{inter:inter,intra:intra}};
    // return fetchlift;
  }

  @Post('search-lift')
  async SearchLift(@Body() body) {
    try {
        const data = body;
        let   id   = body.user.id;
        delete body.user;
        var searchLift = await this.liftService.searchLift(body,id);
        var searchDate = body.occasional_date;
        var liftData = [];
        //searchLift = JSON.parse(JSON.stringify(searchLift));
        //return  moment(body.occasional_time, 'HH:mm A').add(10, 'minutes').format('HH:mm A');
        var inputdate1 = moment(body.occasional_time, 'HH:mm A').subtract(120, 'minutes').format('HH:mm');
        var inputdate2 = moment(body.occasional_time, 'HH:mm A').add(120, 'minutes').format('HH:mm');
        
        if(searchLift.length > 1){           //if data more then 1
          searchLift.map((item,index)=>{
              const lift ={
                "id": item['_id'],
                "driver_id":item['user_id'],
                "price": item['price'],
                "distance": item['distance'],
                "passenger": item['passenger'],
                "car": item['pick_preferences']['car'],
                "date":searchDate,
              };  
              if(body.occasional_date){    // check date 
                var dayname = moment(body.occasional_date, "D MMM YYYY").format("dddd");
                dayname = 'Every '+dayname;  // if rider create ride frequently chek acoording date if date to weekly
                const date1 = moment(item['departure_time'], 'HH:mm A').format('HH:mm');
                if((body.occasional_date == item['occasional'] || item['frequent'].includes(dayname))
                ){
                  if(date1 >=inputdate1 && date1 <=inputdate2 && body.is_pick_preference){
                    liftData.push(lift)
                  }else if(!body.is_pick_preference){
                    liftData.push(lift)
                  }
                  
                }
              }
          })
        }else if (searchLift.length > 0){   // if data only one
          const lift ={
            "id": searchLift[0]['_id'],
            "driver_id":searchLift[0]['user_id'],
            "price": searchLift[0]['price'],
            "distance": searchLift[0]['distance'],
            "passenger": searchLift[0]['passenger'],
            "car": searchLift[0]['pick_preferences']['car'],
            "date":searchDate
          };
          const date1 = moment(searchLift[0]['departure_time'], 'HH:mm A').format('HH:mm');
          if(body.occasional_date){    // check date  
            var dayname = moment(body.occasional_date, "D MMM YYYY").format("dddd");
            dayname = 'Every '+dayname;  // if rider create ride frequently chek acoording date if date to weekly
           
            if((body.occasional_date == searchLift[0]['occasional'] || searchLift[0]['frequent'].includes(dayname))
            ){
              if(date1 >=inputdate1 && date1 <=inputdate2 && body.is_pick_preference){
                liftData.push(lift)
              }else if(!body.is_pick_preference){
                liftData.push(lift)
              }else{
                return {"status":true,data:liftData,message:"no data found"};
              }
            }
          }
        }else{
          return {"status":true,data:liftData,message:"no data found"};
        }
        return {"status":true,data:liftData};
    }catch(e){
      if(e.hasOwnProperty('errors')){
        return {"status":false,message:e};
      }else{
        return {"status":false,message:e};
      }
    }
    
  }

  @Get('fetch-all')
  findAll() {
    return this.liftService.findAll();
  }

  @Get('fetch-single-lift/:id')
 async findSinfetchgleLift(@Param('id') id: any) {
   try{
      const lift = await this.liftService.findOne(id);
      if(lift){
        var data = JSON.parse(JSON.stringify(lift));
        data['id'] = data._id;
        delete data._id;
        delete data.__v;
        return {"status":true,data:data};
      }else{
        return {"status":false,message:"no data found"};
      }
   }catch(e){
    return {"status":false,message:e};
   }
    
  }

  @Post('update-lift-status')
 async findOne(@Body() body) {
      try{
        const data ={
          is_active:body['is_active']
        }
        const id = body['lift_id'];
        if(body['is_active'] != true && body['is_active'] != false){
          return {"status":false,message:'your status not valid'};
        }
      const updateLiftStatus = await this.liftService.update(id,data);
     
      if(updateLiftStatus){
        return  {status:true,message:"lift Updated successfully"};
      }else{
        return {status:false,message:"this id not match our record"};
      }
      }catch(e){
        return {"status":false,message:e};
      }
  }

  @Post('get-route-image')
  async getStaticImageRoute(@Body() body) {
    try{
        const to   = body.to;
        const from = body.from;
        const response = await fetch('https://maps.googleapis.com/maps/api/directions/json?origin='+to+'&destination='+from+'&mode=driving&key='+GOOGEL_MAP_KEY+'', {
          method: 'GET',
          headers: {'Content-Type': 'application/json'}
        });
       const data = await response.json();
       const url =  'https://maps.googleapis.com/maps/api/staticmap?size=360x800&maptype=roadmap&scale=2&markers=size:mid|color:red|'+body.to+'|'+body.from+'&path=weight:2|enc%3A'+data.routes[0].overview_polyline.points+'&key='+GOOGEL_MAP_KEY+'';
        return {status:true, url:url};
       
       }catch(e){
         return {"status":false,message:e};
       }
    }

    @Get('get-place-api')
    async getPlaceApi(){
      
      const response = await fetch('https://maps.googleapis.com/maps/api/directions/json?origin=28.5355,77.3910&destination=28.9845,77.7064&sensor=true&avoid=highways&mode=driving&alternatives=true&key='+GOOGEL_MAP_KEY+'', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      });
       const data = await response.json();
       return data;
    }

    @Post('create-lift-request')
    async LiftRequestFromUSer(@Body() body) {
      try {
        const data = body;
        const usre_id = body.user.id;
        delete data.user;
        data['user_id']=usre_id;
        const lift_id = body.lift_id;
        body['user_status'] = 'inititate';
        body['driver_status'] = 'pending';
        body['created_at'] = moment().format('LLL');
        body['created_at_time'] = moment().format('YYYYMMDDhmm');
        if(!body['passenger'] || !body['lift_id'] || !body['driver_id'] || !body['date']){
          return {"status":false,message:'provide valid parameter'};
        }
        const chekLiftExits = await this.liftService.findOne(lift_id);
        console.log(chekLiftExits)
        if(!chekLiftExits){
          return {"status":false,message:'this lift not match our record'};
        }


        const checkRequest = await this.liftService.checkRequestExits(data);
        if(checkRequest){
          return {"status":true,message:'your request already in process'};
        }
      
       
        const userdata = await this.usersService.findDataFromId(usre_id);
        var useramount = parseInt(userdata['wallet_amount_user']);
        var liftamount = parseInt(userdata['wallet_amount_user']) * parseInt(body['passenger']);
        if(useramount < parseInt(chekLiftExits['price'])){
          return {"status":false,message:'your wallet amount is low'};
        }

        const liftRequest = await this.liftService.createdLiftRequest(data);
        if(liftRequest){
          const notificationData={
            'lift_request_id':liftRequest._id,
            'user_id'        :liftRequest.user_id,
            'notify_from'    :'user',
            'driver_id'      :liftRequest.driver_id,
            'message'        :'has sent requested a seat',
            'created_at'     :moment().format('DD/MM/YYYY h:mm A')
          }
          const notification = await this.liftService.createdNotification(notificationData);
          const searchUser = await this.usersService.findDataFromId(liftRequest.user_id);
          const searchDriver = await this.usersService.findDataFromId(liftRequest.driver_id);
          if(searchUser && searchDriver){
            let name       = searchUser['first_name']+' '+searchUser['last_name'];
            let bodymsg  = name+' has sent you a request for '+data['passenger']+' seat';
           await this.helperService.pushNotifications(searchDriver['fcm'],'vyno',bodymsg);
          }
          return {status:true,message:"request created successfully"};
        }else{
          return {status:true,message:"something went wrong"};
        }
      } catch(e){
        if(e.hasOwnProperty('errors')){
          return {"status":false,message:e};
        }else{
          return {"status":false,message:e};
        }
      }
    }

    @Get('get-lift-request/:role')
    async fetchUserRequest(@Body() body,@Param('role') roles: string) {
      try {
          const user_id = body.user.id;
          const role = ["user", "driver"];
          const roleType = roles;  
          const inter =[];
          const intra =[];
          const all =[];
          if(!role.includes(roles)){
            return {"status":false,message:'provide valid parameter'};
          }
          if(roles == 'user'){
            var myLiftRequest = await this.liftService.myLiftUserRequest(user_id);
            var myVirtualLift = await this.liftService.myVirtualLiftRequest(user_id);
            myVirtualLift.map((item,index)=>{
              const data ={};
              data['type']        = item.type;
              data['to']          = item.to.address;
              data['from']        = item.from.address;
              data['passenger']   = item.passenger;
              data['distance']    = (item.distance) ? item.distance : '';
              data['price']       = (item.price) ? item.price : '';
              data['profile']     = (item.user[0].profile) ? item.user[0].profile : '';
              data['rating']      = Math.floor(Math.random() * (5 - 2 + 1) + 2);
              data['lift_request_id']  = item._id;
              data['name']        = item.user[0].first_name +' ' + item.user[0].last_name;
              data['status']      = (item.approval) ? 'accepted' : 'pending';
              data['is_virtual']  = true;
              data['created_at']  = item.created_at;
              if(item.type == 'intra'){
                intra.push(data);
              }else if(item.type == 'inter'){
                inter.push(data);
              }
              all.push(data);
            });
            
          }else if(roles == 'driver'){
            var myLiftRequest = await this.liftService.myLiftDriverRequest(user_id);
          }
          myLiftRequest.map((item,index)=>{
            // console.log(item);
              if(item.lift[0].type == 'intra'){
                const data ={};
                data['type']        = item.lift[0].type;
                data['to']          = item.lift[0].to.address;
                data['from']        = item.lift[0].from.address;
                data['passenger']   = item.passenger;
                data['distance']    = (item.lift[0].distance) ? item.lift[0].distance : '';
                data['price']       = (item.lift[0].price) ? item.lift[0].price : '';
                data['profile']     = (item.lift[0].profile) ? item.lift[0].profile : '';
                data['rating']      = Math.floor(Math.random() * (5 - 2 + 1) + 2);
            data['lift_request_id'] = item._id;
                data['name']        = item.rider[0].first_name +' ' + item.rider[0].last_name;
                data['status']      = item.driver_status;
                data['is_virtual']  = false;
                data['created_at']  = moment(item.created_at).format('DD/MM/YYYY h:mm A');
                intra.push(data);
                if(roles == 'driver' && data['status'] == 'pending'){
                  all.push(data);
                }
              }else if(item.lift[0].type == 'inter'){
                const data ={};
                data['type']        = item.lift[0].type;
                data['to']          = item.lift[0].to.address;
                data['from']        = item.lift[0].from.address;
                data['passenger']   = item.passenger;
                data['distance']    = (item.lift[0].distance) ? item.lift[0].distance : '';
                data['price']       = (item.lift[0].price) ? item.lift[0].price : '';
                data['profile']     = (item.lift[0].profile) ? item.lift[0].profile : '';
                data['rating']      = Math.floor(Math.random() * (5 - 2 + 1) + 2);
            data['lift_request_id'] = item._id;
                data['name']        = item.rider[0].first_name +' ' + item.rider[0].last_name;
                data['status']      = item.driver_status;
                data['is_virtual']  = false;
                data['created_at']  = moment(item.created_at).format('DD/MM/YYYY h:mm A');
                inter.push(data);
                if(roles == 'driver' && data['status'] == 'pending'){
                  all.push(data);
                }
              }
          })
          return {"status":true,data:{inter:inter,intra:intra,all:all}};
      } catch(e){
        if(e.hasOwnProperty('errors')){
          return {"status":false,message:e};
        }else{
          return {"status":false,message:e};
        }
      }
    }

    @Post('action-lift-request')
    async accepctRejectLiftRequst(@Body() body) {
      try {
        const action = ["accepted", "rejected"];
        var data={};
            data['lift_request_id'] = body.lift_request_id;
            data['action'] = body.action;
        if(!body['action'] || !body['lift_request_id']){
          return {"status":false,message:'provide valid parameter'};
        }else if(!action.includes(body['action'])){
          return {"status":false,message:'action not match our record'};
        }else{
         
            if(body['action'] == 'accepted'){
              const liftRequestAccepted = await this.liftService.actionLiftRequest(data);
              if(liftRequestAccepted){
                const fetchLift = await this.liftService.findOne(liftRequestAccepted['lift_id']);
                
                if(fetchLift){
                  var bookingdata={
                    'lift_request_id' :body['lift_request_id'],
                    'user_id'         :liftRequestAccepted['user_id'],
                    'driver_id'       :liftRequestAccepted['driver_id'],
                    'to'              :fetchLift['to'],
                    'from'            :fetchLift['from'],
                    'price'           :fetchLift['price'],
                    'passenger'       :fetchLift['passenger'],
                    'distance'        :fetchLift['distance'],
                    'date'            :liftRequestAccepted['date'],  
                    'created_at'      :moment().format('DD/MM/YYYY h:mm A')  
                  };
                 
                  const booking = await this.liftService.createdLiftBooking(bookingdata);
                 
                  if(booking){
                    var userDeductAmount = parseInt(fetchLift['price']) * parseInt(liftRequestAccepted['passenger'])
                    //for amount deduct user and add amount in buffer
                  await this.addAmountInVirtualBuffer(booking['user_id'],booking['_id'],userDeductAmount);
                  //
                    const notificationData={
                      'lift_request_id':body['lift_request_id'],
                      'user_id'       :liftRequestAccepted['user_id'],
                      'notify_from'   :'driver',
                      'driver_id'     :liftRequestAccepted['driver_id'],
                      'message'       :'has accepted your lift request',
                      'created_at'    :moment().format('DD/MM/YYYY h:mm A')
                    }
                    const notification = await this.liftService.createdNotification(notificationData);
                   //push notifications
                   const searchDriver = await this.usersService.findDataFromId(liftRequestAccepted['driver_id']);
                   const searchUser = await this.usersService.findDataFromId(liftRequestAccepted['user_id']);
                   if(searchUser && searchDriver){
                    let bodymsg = searchDriver['first_name']+' '+searchDriver['first_name']+' has accepted your request for '+fetchLift['passenger']+' seat';
                    this.helperService.pushNotifications(searchUser['fcm'],'vyno',bodymsg);
                  }
                 //push notifications
                    return {"status":true,message:'you accepcted this ride'};
                  }
                }
              }
            }else if(body['action'] == 'rejected'){
              const liftRequestRejected = await this.liftService.actionLiftRequest(data);
              if(liftRequestRejected){
                const notificationData={
                  'lift_request_id':body['lift_request_id'],
                  'user_id'       :liftRequestRejected['user_id'],
                  'notify_from'   :'driver',
                  'driver_id'     :liftRequestRejected['driver_id'],
                  'message'       :'has rejected your lift request',
                  'created_at'    :moment().format('DD/MM/YYYY h:mm A')
                }
                const notification = await this.liftService.createdNotification(notificationData);
                  const searchDriver = await this.usersService.findDataFromId(liftRequestRejected['driver_id']);
                   const searchUser = await this.usersService.findDataFromId(liftRequestRejected['user_id']);
                if(searchUser && searchDriver){
                  let bodymsg = searchDriver['first_name']+' '+searchDriver['first_name']+' has rejected your lift request';
                  this.helperService.pushNotifications(searchUser['fcm'],'vyno',bodymsg);
                }

                return {"status":true,message:'lift request rejected successfully'};
              }else{
                return {"status":false,message:'request not match our record'};
              }
            }
        }
      } catch(e){

      }
    }  

   async addAmountInVirtualBuffer(user_id,booking_id,amount){
      const userdata = await this.usersService.findDataFromId(user_id);
      var useramount = parseInt(userdata['wallet_amount_user']) - parseInt(amount);
      var virtulBufferData= {
        'user_id':user_id,
        'booking_id':booking_id,
        'amount'    :amount,
        'created_at': moment().format('DD/MM/YYYY h:mm A')
      };
     const updatevirtualBuffer = await this.liftService.addAmountInVirtualBuffer(virtulBufferData);
     if(updatevirtualBuffer){
      const userdata = await this.usersService.update(user_id,{'wallet_amount_user':useramount});
      return userdata;
     }
    }

    @Post('my-booking')
    async myBooking(@Body() body) {
      try{
       const id = body.user.id;
        const role = body.role;
        const roledata = (role == 'user') ? 'driver' : 'user';
        const action = ["user", "driver"];
        if(!body['role'] || !action.includes(body['role'])){
          return {"status":false,message:'provide valid parameter'};
        }
        const myBookingData = await this.liftService.myBookingData(id,role);
        if(myBookingData){
          myBookingData.map((item,index) => {
            item['booking_id'] = item._id;
            item['to'] = item.to.address;
            item['from'] = item.from.address;
            delete item._id;
            delete item.__v;
            const user = item[roledata][0];
            delete item[roledata];
            item['user_info'] ={
              "profile":user.profile,
              "name"   :user.first_name+' '+user.last_name,
              "rating" :Math.floor(Math.random() * 5)
            };
          })
          return {"status":true,data:myBookingData};
        }else{
          return {"status":true,message:'no data found'};
        }
      }catch(e){
        return {"status":false,message:e};
      }
        
    }  

    @Get('active-booking/:id')
    async activeLift(@Body() body,@Param('id') id: any) {
      try{
        const lift = await this.liftService.activeBooking(id);
        if(lift){
          return {"status":true,message:'your booking active now'};
        }else{
          return {"status":false,message:"no data found"};
        }
     }catch(e){
      return {"status":false,message:e};
     }
    } 

    @Get('get-booking-user-info')
    async getBookingUserInfo(@Body() body) {
       try{
        const id   = body.user.id;
       // const date = moment().format('DD MMM YYYY');
       const date = '27 Dec 2021';
       const user   = [];
       const driver = [];
        const getBookingUserInfo = await this.liftService.fetchTodayBooking(id,date);
        getBookingUserInfo.map((item,index)=>{
          if(item.driver_id == id){  // user
              let data = {
                  'booking_id' :item._id,
                  'user_id'    :item.user_id,
                  'name'     : item.user[0].first_name+' '+item.user[0].last_name,
                  'profile'  : item.user[0].profile,
                  'phone_number'  : item.user[0].phone_number,
                  'rating'   : 5,
                  'passenger':(item.passenger) ? item.passenger : 0,
                  'distance' : (item.distance) ? item.distance : 0,
                  'price'    : (item.price) ? item.price : 0,
              };
              driver.push(data);
          }else if(item.user_id == id){  //driver
             let data = {
                  'booking_id'  :item._id,
                  'driver_id'   :item.driver_id,
                  'name'        : item.driver[0].first_name+' '+item.driver[0].last_name,
                  'profile'     : item.driver[0].profile,
                  'phone_number': item.driver[0].phone_number,
                  'rating'      : 5,
                  'passenger'   :(item.passenger) ? item.passenger : 0,
                  'distance'    : (item.distance) ? item.distance : 0,
                  'price'       : (item.price) ? item.price : 0,
            };
            user.push(data);
          }
        })
          return {"status":true,user:{'driver_info':(user.length > 0) ? user : 'no data found'},driver:driver};
     }catch(e){
      return {"status":false,message:e};
     }
    } 

    @Post('my-notifications')
    async myNotifications(@Body() body) {
      const action = ["user", "driver"];
      if(!body['role'] || !action.includes(body['role'])){
        return {"status":false,message:'provide valid parameter'};
      }
      if(body['role'] == 'user'){
        const fetchNotification = await this.liftService.fetchNotificationUser(body.user.id);
        fetchNotification.map((item,index)=>{
            item['notification_id'] = item['_id'];
            item['name'] = item.rider[0].first_name +' '+ item.rider[0].last_name;
            item['profile']   = item.rider[0].profile;
            item['created_at']= moment(item['created_at'],'DD/MM/YYYY h:mm A').format('YYYY-MM-DD H:mm:ss');
            delete item['_id'];
            delete item['__v'];
            delete item['rider'];
        });
        return {"status":true,data:fetchNotification};
      }else{
        const fetchNotification = await this.liftService.fetchNotificationDriver(body.user.id);
        fetchNotification.map((item,index)=>{
          item['notification_id'] = item['_id'];
          item['name'] = item.user[0].first_name +' '+ item.user[0].last_name;
          item['profile']   = item.user[0].profile;
          item['created_at']= moment(item['created_at'],'DD/MM/YYYY h:mm A').format('YYYY-MM-DD H:mm');
          delete item['user'];
          delete item['_id'];
          delete item['__v'];
      });
      return {"status":true,data:fetchNotification};
      }
     
    }

    @Post('delete-notifications')
    async deleteNotifications(@Body() body) {
      try{
        var notification_id = body['notification_id'];
        if(!notification_id || notification_id.length < 1){
          return {"status":false,message:'provide valid parameter'};
        }
       
         const deleteNotification = await this.liftService.deleteAllNotification(notification_id);
         if(deleteNotification.deletedCount > 0){
          return {"status":true,message:'notifications delete successfully'};
         }else{
          return {"status":false,message:'this data not match our records'}; 
         }
      }catch(e){
        return {"status":false,message:'this data not match our records'};
      }

    }  

    @Post('create-virtual-lift')
    async createVirtualLift(@Body() body) {
      try {
        const data = body;
        const id = body.user.id;
        delete data.user;
        data['user_id'] = id;
        
        var to = {lat: body.to.lat,lon: body.to.long};
        var from = {lat: body.from.lat,lon: body.from.long};
        var distanceCalculate = Distance.between(to, from);
        body['distance']      = distanceCalculate.human_readable().distance;
        data['created_at']    = moment().format('DD/MM/YYYY h:mm A')
        const createlift      = await this.liftService.createVirtualLift(data);
        if(createlift){
          return {status:true,message:"virtual lift created successfully"};
        }else{
          return {status:true,message:"invalid argument"};
        }
      } catch(e){
        if(e.hasOwnProperty('errors')){
          return {"status":false,message:e};
        }else{
          return {"status":false,message:e};
        }
      }
    }  

    @Get('get-virtual-lift')
    async getVirtualLift(@Body() body) {
       try {
         const user_id = body.user.id;
         var virtualLift = await this.liftService.getVirtualLift(user_id);
        virtualLift       = JSON.parse(JSON.stringify(virtualLift));
        const inter =[];
        const intra =[];
        if(virtualLift.length > 0){
          virtualLift.map((item,index)=>{
            var data={};
            data['name']         = item.user[0].first_name+' '+item.user[0].last_name;
            data['profile']      = item.user[0].profile;
            data['passenger']    = item.passenger;
            data['to']           = item.to.address;
            data['from']         = item.from.address;
            data['created_at']   = item.created_at;
            data['virtual_lift_price']   = item.virtual_lift_price;
            data['virtual_lift_id'] = item._id;
            delete item._id;
            delete item.user;
            delete item.__v;
            var is_rejected = 0;
            if(item.rejected_id && item.rejected_id.includes(body.user.id)){
              is_rejected = 1;
            } 
              if(item.type == 'inter' && is_rejected == 0 && !item.accepted_id){
                inter.push(data);
              }else if(item.type == 'intra' && is_rejected == 0 && !item.accepted_id){
                intra.push(data);
              }
              
          })
          return {status:true,data:{'inter':inter,'intra':intra}};
        }else{
          return {status:true,message:"no virtual lift found"};
        }
      } catch(e){
        if(e.hasOwnProperty('errors')){
          return {"status":false,message:e};
        }else{
          return {"status":false,message:e};
        }
      }
    }  
    

    @Post('get-virtual-lift-details')
    async getSingleVirtualLift(@Body() body) {
      try {
        const id = body.virtual_lift_id;
        if(!body['virtual_lift_id']){
          return {"status":false,message:'provide valid parameter'};
        }
        var virtualLift = await this.liftService.getVirtualLiftDetails(id);
        virtualLift       = JSON.parse(JSON.stringify(virtualLift));
        if(virtualLift){
          virtualLift['id'] = virtualLift._id;
          delete virtualLift._id;
          delete virtualLift.__v;
          delete virtualLift['user_id'];
          return {status:true,data:virtualLift};
        }else{
          return {status:true,message:"no virtual lift found"};
        }
      } catch(e){
        if(e.hasOwnProperty('errors')){
          return {"status":false,message:e};
        }else{
          return {"status":false,message:e};
        }
      }
    }  
   
    @Post('virtual-lift-accept-user')
    async virtualLiftAcceptUser(@Body() body) {
       try{
      const lift_id         =  body['lift_request_id'];
      const notification_id = body['notification_id'];
      if(!lift_id || !notification_id){
        return {"status":false,message:'provide valid parameter'};
      }
      const approvalVirtuallift = await this.liftService.approvalVirtualLift(lift_id);
      if(approvalVirtuallift){
        var data = JSON.parse(JSON.stringify(approvalVirtuallift))
        data['user_id']    = data['accepted_id'];
        data['is_virtual'] = true;
        delete data['rejected_id'];
        delete data.__v;
        delete data._id;
        delete data['created_at'];
        delete data['updated_at'];
        delete data['approval'];
        delete data['accepted_id'];
        const createlift = await this.liftService.create(data);  
        if(createlift){
          var bookingdata={
            'user_id'         :body.user.id,
            'driver_id'       :createlift['user_id'],
            'to'              :createlift['to'],
            'from'            :createlift['from'],
            'price'           :createlift['price'],
            'passenger'       :createlift['passenger'],
            'distance'        :createlift['distance'],
            'date'            :createlift['occasional'],  
            'is_virtual'      :true,  
            'created_at'      :moment().format('DD/MM/YYYY h:mm A')  
          };
          const booking = await this.liftService.createdLiftBooking(bookingdata);
          if(booking){
            const deleteNotification = await this.liftService.deleteAllNotification([notification_id]);
            return {"status":true,message:'accepted successfully'};
          }else{
            const deletelift = await this.liftService.deleteLift(createlift['_id']); 
            return {"status":true,message:'something went wrong'};
          }
        }      
      }else{
        return {"status":false,message:'this lift not exits our record'};
      }

      }catch(e){
        return {"status":false,message:'something went wrong'};
      }
    } 
    
    @Post('virtual-lift-reject-user')
    async virtualLiftRejectUser(@Body() body) {
      const lift_id         =  body['lift_request_id'];
      const notification_id = body['notification_id'];
      if(!lift_id || !notification_id){
        return {"status":false,message:'provide valid parameter'};
      }
      const rejectVirtualLiftFromUser = await this.liftService.removeVirtualLiftFromuser(lift_id);
      if(rejectVirtualLiftFromUser && rejectVirtualLiftFromUser.modifiedCount > 0){
        const deleteNotification = await this.liftService.deleteAllNotification([notification_id]);
         return {"status":true,message:'rejected successfully'};
      }else{
        return {"status":false,message:'this lift not exits our record'};
      }
    }

    @Post('virtual-lift-accept-reject')
    async virtualLiftAcceptReject(@Body() body) {
      try {
        const action        = ["rejected", "accepted"];
        const driver_id     = body.user.id;
        const price         = body.price;
        var updatedData     = body;
        var lift_id =body['virtual_lift_id'];
        if(!body['action'] || !lift_id || !action.includes(body['action'])){
          return {"status":false,message:'provide valid parameter'};
        }
        var virtualLift = await this.liftService.getVirtualLiftDetails(lift_id);
        virtualLift       = JSON.parse(JSON.stringify(virtualLift));
        if(!virtualLift || virtualLift['accepted_id']){
          return {"status":false,message:'this lift has been already taken by another rider'};
        }else if(body['action'] == 'rejected'){
          if(virtualLift['rejected_id']){
            const old_data = virtualLift['rejected_id'];
            old_data.push(body.user.id);
            const updateData = await this.liftService.updateVirtualLiftDetails(lift_id,old_data);
            return {"status":true,message:'updated successfully'};
          }else{
            const updateData = await this.liftService.updateVirtualLiftDetails(lift_id,[body.user.id]);
            return {"status":true,message:'updated successfully'};
          }
           
        }else if(body['action'] == 'accepted'){
          delete updatedData.action;
          delete updatedData.user;
          delete updatedData.virtual_lift_id;
          updatedData['accepted_id'] = driver_id;
          updatedData['updated_at']  = moment().format('DD/MM/YYYY h:mm A');
          const acceptVirtualLiftFromDriver = await this.liftService.acceptVirtualLiftFromDriver(lift_id,updatedData);
          if(acceptVirtualLiftFromDriver){
            const notificationData={
              'lift_request_id'     :acceptVirtualLiftFromDriver._id,
              'user_id'             :acceptVirtualLiftFromDriver['user_id'],
              'notify_from'         :'driver',
              'driver_id'           :driver_id,
              'is_virtual'          :true,
              'virtual_lift_price'  :price,
              'message'             :'has accepted your virtual lift request',
              'created_at'          :moment().format('DD/MM/YYYY h:mm A')
            }
            const user_id = acceptVirtualLiftFromDriver['user_id'];
            this.createAndSendNotifications(notificationData,driver_id,user_id);
            return {"status":true,message:'accepted successfully'};
          }
          
        }
        
      } catch(e){
        if(e.hasOwnProperty('errors')){
          return {"status":false,message:e};
        }else{
          return {"status":false,message:e};
        }
      }
    }

    @Post('cancle-booking')
    async cancleBooking(@Body() body) {
         try{
          const booking_id = body.booking_id;
          const my_role    = body.myrole;
          const user_id    = body.user.id;
          body['user_id']  = body.user.id; 
          delete body.user;
          var action         =    ["user", "driver"];
          if(!booking_id || !my_role || !action.includes(my_role)){
            return {"status":false,message:'provide valid parameter'};
          }
          var cancleBooking = await this.liftService.cancleBooking(body);
          if(cancleBooking 
            && Object.keys(cancleBooking).length !== 0){
              const getVirtualBuffer = await this.liftService.getVirtualBuffer(booking_id);
  
              if(getVirtualBuffer){
                var bufferId           = getVirtualBuffer['_id'];
                let userid             = getVirtualBuffer['user_id'];
                let amount             = getVirtualBuffer['amount'];
                const getUserData      = await this.usersService.findDataFromId(userid);
                const walleteAmount    = getUserData["wallet_amount_user"];
                const newAmount = getUserData["wallet_amount_user"] + parseInt(amount);
                const updateWallete      = await this.usersService.update(userid,{'wallet_amount_user':newAmount});
                if(updateWallete){
                  const removeDataFromVirtualBuffer      = await this.liftService.removeBufferData(bufferId);
                  return {"status":true,message:'cancle successfully'};
                }
              }else{
                return {"status":false,message:'this booking already cancle'};
              }
          }else{
            return {"status":false,message:'this booking not found our record'};
          }

        } catch(e){
          if(e.hasOwnProperty('errors')){
            return {"status":false,message:e};
          }else{
            return {"status":false,message:e};
          }
        }
    }  
    
 async createAndSendNotifications(notificationData,driver_id,user_id,is_create_notification = false){
   console.log(notificationData)
    const notification = await this.liftService.createdNotification(notificationData);
    console.log(notification);
    const searchDriver = await this.usersService.findDataFromId(driver_id);
     const searchUser = await this.usersService.findDataFromId(user_id);
  if(searchUser && searchDriver){
    let bodymsg = searchDriver['first_name']+' '+searchDriver['last_name']+' '+notificationData.message;
    this.helperService.pushNotifications(searchUser['fcm'],'vyno',bodymsg);
  }
  }  

}
