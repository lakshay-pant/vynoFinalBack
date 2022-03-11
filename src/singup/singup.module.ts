import { Module } from '@nestjs/common';
import { SingupService } from './singup.service';
import { UsersService } from '../users/users.service';
import { SingupController } from './singup.controller';
import { User, UserSchema } from '../users/schemas/user.schema';
import { RatingReview, RatingReviewSchema } from '../users/schemas/ratingReview.schema';
import { Momo, MomoSchema } from '../users/schemas/momo.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { HelperService } from '../common/helper';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: RatingReview.name, schema: RatingReviewSchema },
      { name: Momo.name, schema: MomoSchema },
    ]),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '365d' },
    }),
  ],
  controllers: [SingupController],
  providers: [SingupService,UsersService,HelperService]
})
export class SingupModule {}
