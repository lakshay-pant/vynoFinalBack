import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { RatingReview, RatingReviewSchema } from './schemas/ratingReview.schema';
import { Momo, MomoSchema } from './schemas/momo.schema';
import { JwtModule } from '@nestjs/jwt';
import { HelperService } from '../common/helper';
import { MulterModule } from '@nestjs/platform-express';
@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: User.name, schema: UserSchema },
        { name: RatingReview.name, schema: RatingReviewSchema },
        { name: Momo.name, schema: MomoSchema },
      ]
      ),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '365d' },
    }),
    MulterModule.register({
      dest: './public/uploads/document/',
    })
  ],
  controllers: [UsersController],
  providers: [UsersService,HelperService]
})
export class UsersModule {}
