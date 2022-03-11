import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { DocumentController } from './document.controller';
import { Documents, DocumentsSchema } from './schemas/document.schema';
import { HelperService } from '../common/helper';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Documents.name, schema: DocumentsSchema }]),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '365d' },
    }),
    MulterModule.register({
      dest: './public/uploads/document/',
    })
  ],
  controllers: [DocumentController],
  providers: [DocumentService,HelperService]
})
export class DocumentModule {}



