import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schemas/user.schema';

import { RatingReview, RatingReviewSchema } from '../users/schemas/ratingReview.schema';
import { Momo, MomoSchema } from '../users/schemas/momo.schema';
import { Payment, PaymentSchema } from './schemas/payment.schema';
import { History,HistorySchema } from './schemas/history.schema';
import { UsersService } from '.././users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { HelperService } from '../common/helper';
import { MulterModule } from '@nestjs/platform-express';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: RatingReview.name, schema: RatingReviewSchema },
      { name: Momo.name, schema: MomoSchema },
      { name: Payment.name, schema: PaymentSchema },
      { name: History.name, schema: HistorySchema }
    ]),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '365d' },
    }),
    MulterModule.register({
      dest: './public/uploads/document/',
    })
  ],
  controllers: [PaymentController],
  providers: [PaymentService,UsersService,HelperService]
})
export class PaymentModule {}
