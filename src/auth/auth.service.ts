import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import { RegisterDtoRequest } from "src/auth/dto/request/register.dto-request";
import { TUser } from "src/entities/user.entity";
import { UserNotFoundException } from "src/exceptions/UserExceptions";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<TUser> {
    const { password: hashedPassword, ...user } =
      await this.usersService.expectOneByEmail(email);

    const match = await compare(password, hashedPassword);

    if (match) return user;

    throw new UserNotFoundException();
  }

  async login(user: TUser) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: "7d",
      }),
    };
  }

  async register({ email, password, firstName, lastName }: RegisterDtoRequest) {
    return this.usersService.create(email, password, firstName, lastName);
  }
}
