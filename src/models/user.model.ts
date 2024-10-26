import { IsAlpha, IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { faker } from "@faker-js/faker";

export class User {
      id: string;
      @IsNotEmpty() @IsAlpha() @MinLength(3) @MaxLength(20)
      name: string;
      @IsNotEmpty() @IsEmail()
      email: string;

      constructor(name: string, email: string) {
            this.id = faker.string.uuid();
            this.name = name;
            this.email = email;
      }
}