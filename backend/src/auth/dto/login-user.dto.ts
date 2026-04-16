import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  credential!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(128)
  password!: string;
}
