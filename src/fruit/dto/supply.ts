import { IsNumber, IsOptional,IsString, Min } from 'class-validator';

export class Supply {
  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly total:number;

  @IsOptional()
  @IsString()
  readonly msg:string;
}