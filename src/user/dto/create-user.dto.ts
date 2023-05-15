import { IsOptional, IsString } from 'class-validator';

export class createUserDto {
  @IsOptional()
  @IsString()
  readonly user_id: string;
}
