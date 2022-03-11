import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { SingupModule } from './singup/singup.module';
import { LoginMiddleware } from './common/login.middleware';
import { AdminMiddleware } from './common/admin.middleware';
import { ConfigModule } from '@nestjs/config';
import { ENV } from 'config/environment';
import { AddressModule } from './address/address.module';
import { MulterModule } from '@nestjs/platform-express';
import { AdminModule } from './admin/admin.module';
import { LiftModule } from './lift/lift.module';
import { DocumentModule } from './document/document.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    MongooseModule.forRoot(ENV.DB_URL),
     UsersModule,
     JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '365d' },
    }),
     AuthModule,
     SingupModule,
     ConfigModule.forRoot(),
     AddressModule,
     MulterModule.register({
      dest: './public/uploads/document/',
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    AdminModule,
    LiftModule,
    DocumentModule,
    PaymentModule,
   
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoginMiddleware)
      .forRoutes('v1/user');
    consumer
    .apply(LoginMiddleware)
    .forRoutes('v1/admin');
    consumer
    .apply(LoginMiddleware)
    .forRoutes('v1/lift');
    consumer
    .apply(LoginMiddleware)
    .forRoutes('v1/address');
    consumer
    .apply(LoginMiddleware)
    .forRoutes('v1/document');
    consumer
    .apply(LoginMiddleware)
    .forRoutes('v1/payment');
  }
}
