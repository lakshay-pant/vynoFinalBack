import { PartialType } from '@nestjs/mapped-types';
import { CreateSingupDto } from './create-singup.dto';

export class UpdateSingupDto extends PartialType(CreateSingupDto) {}
