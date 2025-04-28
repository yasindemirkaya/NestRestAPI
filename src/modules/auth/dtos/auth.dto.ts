import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { validationMessages } from 'src/utils/validation-messages';

export class AuthDto {
  @IsEmail({}, { message: validationMessages.email.invalid })
  @IsNotEmpty({ message: validationMessages.email.empty })
  email: string;

  @IsString({ message: validationMessages.password.string })
  @IsNotEmpty({ message: validationMessages.password.empty })
  password: string;
}
