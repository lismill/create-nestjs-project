import { IsNotEmpty, IsString } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  password: string;

  age: number;

  city: string;
}
