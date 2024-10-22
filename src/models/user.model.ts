import { IsAlpha, IsEmail, IsNotEmpty } from "class-validator";
import { faker } from "@faker-js/faker";

export class User {
      id: string;
      @IsNotEmpty() @IsAlpha()
      name: string;
      @IsNotEmpty() @IsEmail()
      email: string;

      constructor(name: string, email: string) {
            this.id = faker.string.uuid();
            this.name = name;
            this.email = email;
      }
}