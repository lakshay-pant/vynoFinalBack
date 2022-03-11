import { Module } from '@nestjs/common';
import { LiftService } from './lift.service';
import { LiftController } from './lift.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Lift, LiftSchema } from './schemas/lift.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { LiftRequest, LiftRequestSchema } from './schemas/liftRequest.schema';
import { LiftBooking, LiftBookingSchema } from './schemas/liftBooking.schema';
import { VirtualBuffer, VirtualBufferSchema } from './schemas/virtualBuffer.schema';
import { VirtualLift, VirtualLiftSchema } from './schemas/virtualLift.schema';
import { LiftNotification, LiftNotificationSchema } from './schemas/liftNotification.schema';
import { RatingReview, RatingReviewSchema } from '../users/schemas/ratingReview.schema';
import { Momo, MomoSchema } from '../users/schemas/momo.schema';
import { UsersService } from '.././users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { HelperService } from '../common/helper';
import { MulterModule } from '@nestjs/platform-express';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Lift.name, schema: LiftSchema },
      { name: LiftRequest.name, schema: LiftRequestSchema },
      { name: LiftBooking.name, schema: LiftBookingSchema },
      { name: LiftNotification.name, schema: LiftNotificationSchema },
      { name: User.name, schema: UserSchema },
      { name: RatingReview.name, schema: RatingReviewSchema },
      { name: VirtualLift.name, schema: VirtualLiftSchema },
      { name: Momo.name, schema: MomoSchema },
      { name: VirtualBuffer.name, schema: VirtualBufferSchema },
    ]),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '365d' },
    }),
    MulterModule.register({
      dest: './public/uploads/document/',
    })
  ],
  controllers: [LiftController],
  providers: [LiftService,HelperService,UsersService]
})
export class LiftModule {}
