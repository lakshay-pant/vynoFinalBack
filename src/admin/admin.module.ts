import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { UsersService } from '../users/users.service';
import { User, UserSchema } from '../users/schemas/user.schema';
import { RatingReview, RatingReviewSchema } from '../users/schemas/ratingReview.schema';
import { Momo, MomoSchema } from '../users/schemas/momo.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
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
  controllers: [AdminController],
  providers: [AdminService,UsersService]
})
export class AdminModule {}
