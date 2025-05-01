import {
  IsOptional,
  IsString,
  IsBoolean,
  IsMobilePhone,
  IsIn,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsMobilePhone()
  mobile?: string;

  @IsOptional()
  @IsIn([0, 1, 2])
  role?: number;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsOptional()
  @IsBoolean()
  is_verified?: boolean;
}
