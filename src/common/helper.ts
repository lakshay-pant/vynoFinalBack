import { Injectable } from '@nestjs/common';
import * as fs from "fs";
import { time } from 'console';
import {GOOGEL_MAP_KEY, PUSH_NOTIFICATION , FIREBASE_SERVER_KEY} from '../../config/configuration'
const mime = require('mime');
const multer = require('multer');
const NodeGeocoder = require('node-geocoder');
const options = {
  provider: 'google',
  apiKey: '', // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};
const geocoder = NodeGeocoder(options);
var FCM = require('fcm-node');
var serverKey = FIREBASE_SERVER_KEY; //put your server key here
var fcm = new FCM(serverKey);
@Injectable()
export class HelperService {

  base64ImageUpload(imgBase64: any) {
    try {
    var matches = imgBase64.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    const  response = {};
        if (matches.length !== 3) {
            return {"status":"false",message:'invalid format of images'};
        }
        var dir = './public/uploads/images/';
        var pathDir = '/public/uploads/images/';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir , { recursive: true });
        } 

       let imageBuffer = Buffer.from(matches[2], 'base64')
       let type = matches[1];
       let extension = mime.extension(type);
       const d = new Date();
       let time = d.getTime();
       let fileName = "image"+time+"." + extension;
       
        fs.writeFileSync(dir + fileName, imageBuffer, 'utf8');
        let path = pathDir+fileName;

        return {"status":true,path:path  };
       } catch (e) {
        return {"status":false,message:e};
       }

  }


  documentUpload(data){
    try {
        var dir = './public/uploads/document';
        var pathDir = '/public/uploads/document';
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir , { recursive: true });
        } 
        var array =[];
        data.map( (item, index) =>{  
            array.push(item); 
           
          });        
          return array;    
         } catch (e) {
          return {"status":"false",message:e};
         }
  
  }

  removeUnderscoreFromcolumn(data){
    var User = JSON.parse(JSON.stringify(data));
     User['id'] = User._id;
     delete User.__v;
     delete User._id;
     return User;
  }

 getReverseGeocodingData(lat, lng) {
  const res =  geocoder.reverse({ lat: lat, lon: lng });
  return res;
}

    //push notification

    pushNotifications(fcm_token,title_msg,msg){
      if(PUSH_NOTIFICATION && fcm_token){
          var message = { 
            to: fcm_token, 
            notification: {
                title: title_msg, 
                body: msg 
            },
        };
        fcm.send(message, function(err, response){
            if (err) {
                console.log("Something has gone wrong!");
            } else {
                console.log("Successfully sent with response: ", response);
            }
        });
    }
  }
  
    //push notifications
  


}
