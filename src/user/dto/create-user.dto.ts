import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export class createUserDto {
  @IsUUID('4')
  readonly u_number: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  u_id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  u_password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  u_email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  u_name: string;

  @IsOptional()
  //@Transform((value) => value ?? null)
  @ApiPropertyOptional()
  u_post: string;

  @IsOptional()
  @ApiPropertyOptional()
  u_address1: string;

  @IsOptional()
  @ApiPropertyOptional()
  u_address2: string;

  @IsOptional()
  @ApiPropertyOptional()
  u_cellphone: string;

  constructor() {
    this.u_number = uuidv4();
  }
}
