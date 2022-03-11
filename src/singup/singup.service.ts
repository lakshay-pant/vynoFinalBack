import { Injectable } from '@nestjs/common';
import { CreateSingupDto } from './dto/create-singup.dto';
import { UpdateSingupDto } from './dto/update-singup.dto';

@Injectable()
export class SingupService {
  create(createSingupDto: CreateSingupDto) {
    return 'This action adds a new singup';
  }

  findAll() {
    return `This action returns all singup`;
  }

  findOne(id: number) {
    return `This action returns a #${id} singup`;
  }

  update(id: number, updateSingupDto: UpdateSingupDto) {
    return `This action updates a #${id} singup`;
  }

  remove(id: number) {
    return `This action removes a #${id} singup`;
  }
}
