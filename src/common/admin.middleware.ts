import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AdminMiddleware implements NestMiddleware {
    constructor(private jwtService: JwtService) {}
 async use(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.header('authorization').split(' ')[1]; // Authorization: 'Bearer TOKEN'
        if (!token) {
          throw new Error('Authentication failed!');
        }
        const verified = await this.jwtService.verifyAsync(token);
        req.body.user = verified;  
        next();
      } catch (err) {
        res.status(400).send({ status: false,message:'invalid token' });
      }
   
  }
}
