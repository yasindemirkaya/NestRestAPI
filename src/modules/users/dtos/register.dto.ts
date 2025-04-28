import { IsString, IsEmail, Length, Matches } from 'class-validator';
import { validationMessages } from '../../../utils/validation-messages';

export class RegisterDto {
  // FIRST NAME
  @IsString({ message: validationMessages.first_name.string })
  @Matches(/^[a-zA-Z]+$/, {
    message: validationMessages.first_name.regex,
  })
  first_name: string;

  // LAST NAME
  @IsString({ message: validationMessages.last_name.string })
  @Matches(/^[a-zA-Z]+$/, {
    message: validationMessages.last_name.regex,
  })
  last_name: string;

  // EMAIL
  @IsEmail({}, { message: validationMessages.email.invalid })
  email: string;

  // MOBILE
  @Length(10, 10, { message: validationMessages.mobile.length })
  mobile: string;

  // PASSWORD
  @IsString({ message: validationMessages.password.string })
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, {
    message: validationMessages.password.regex,
  })
  password: string;
}
