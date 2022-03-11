import { PartialType } from '@nestjs/mapped-types';
import { CreateLiftDto } from './create-lift.dto';

export class UpdateLiftDto extends PartialType(CreateLiftDto) {}
