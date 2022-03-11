import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { UsersService } from '../users/users.service';
import { HelperService } from '../common/helper';
import { MOMO } from 'config/configuration';
import { v4  } from 'uuid';
import * as moment from 'moment';
import { async } from 'rxjs';
const { base64encode, base64decode } = require('nodejs-base64');
let fetch = require('node-fetch');
@Controller({path:'payment',version:'1'})
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly usersService: UsersService,
    private helperService:HelperService
    ) {}

  @Post('request-to-pay')
 async create(@Body() body) {
   const user_id = body.user.id;
   const role = body.role;  

    if(!body['amount']  || !body['partyId'] || role !== 'user'){
      return {"status":false,message:'provide valid parameter'};
    }
    
    const findMomoCredential = await this.usersService.findMomoCredential(body.user.id);
    if(!findMomoCredential){
      return {"status":false,message:'your account not found in momo mtn'};
    }
    
  
  //  for genrate token
    var url =  MOMO.MOMO_URL+ '/collection/token/';
    var headerfortoken = {
      "Authorization": "Basic " + base64encode(findMomoCredential['username'] + ":" + findMomoCredential['password']),
      'Content-Type'   : 'application/json',
      'Ocp-Apim-Subscription-Key':MOMO.OcpApimSubscriptionKey,
      'Content-Length':'0'
    };
    return  await fetch(url, {
      method: 'POST',
      headers: headerfortoken
      })
  .then(async responsedata => {
    if(responsedata.status == 200){
        var result    = await responsedata.json();
        const bodydata = {
          "amount": body['amount'],
          "currency": "EUR",
          "externalId": "6353636",
          "payer": {
            "partyIdType": "MSISDN",
            "partyId": body['partyId']
          },
          "payerMessage": "pay for ride",
          "payeeNote": "pay for ride"
        };
        var url =  MOMO.MOMO_URL+ '/collection/v1_0/requesttopay';
        var uuidv4 = v4();
        var headerForpayment = {
          'Content-Type'   : 'application/json',
          'Ocp-Apim-Subscription-Key': MOMO.OcpApimSubscriptionKey,
          'X-Reference-Id'           : uuidv4,
          'X-Target-Environment'     : MOMO.XTargetEnvironment,
          'Authorization'            : 'Bearer '+result.access_token
        };
        
       return await fetch(url, {
          method: 'POST',
          headers: headerForpayment,
          body: JSON.stringify(bodydata)
        }).then(async response => {
          var paymentData ={
            'user_id':user_id,
            'request_uuid':uuidv4,
            'amount': body['amount'],
            'created_at':moment().format('DD/MM/YYYY h:mm A')
        }
          if(response.status === 202){
            paymentData['status'] = 'success';
            paymentData['message'] = 'fund added successful';
            const payment =  await this.paymentService.create(paymentData);
            const fetchUserDetails =  await this.usersService.findDataFromId(user_id);
            var amount = parseInt(fetchUserDetails['wallet_amount_user']) + parseInt(body['amount']);
            const updateUserWallet =  await this.usersService.updateUserWallet(user_id,amount);
            const history = {
              "type":'credit',
              "payment_id": payment['_id'],
              "created_at":moment().format('DD/MM/YYYY h:mm A')
            }
            const historyCreate =  await this.paymentService.historyCreate(history);
            return  {status:true,message:"payment request successful"};
          }else{
            paymentData['status'] = 'failed';
            paymentData['message'] = 'invalid number';
            await this.paymentService.create(paymentData);
            return {status:false,message:'invalid number'};
          }  
        }).catch(error => {
          return {status:false,message:error};
        });
       
        
    }else{
      return {status:false,message:''};
    } 
  })
  .catch(error => {
    return {status:false,message:error};
  });
  }

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
