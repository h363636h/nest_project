import { OmitType, PartialType } from '@nestjs/swagger';
import { createUserDto } from './create-user.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(
  OmitType(createUserDto, ['u_number', 'u_id']),
) {}
