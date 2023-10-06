import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare, hash } from "bcrypt";
import { AuthMapper } from "src/auth/auth.mapper";
import { RegisterDtoRequest } from "src/auth/dto/request/register.dto-request";
import { LoginResponseDto } from "src/auth/dto/response/login.response-dto";
import { RegisterResponseDto } from "src/auth/dto/response/register.response-dto";
import { SALT_ROUNDS, USERS_REPOSITORY } from "src/common/constants";
import { TCurrentUser } from "src/common/decorators/current-user.decorator";
import { configService } from "src/config/config.service";
import { TUser } from "src/entities/user.entity";
import {
  EmailAlreadyExistsException,
  UserNotFoundException,
} from "src/exceptions/user.exceptions";
import { IUserRepository } from "src/users/users.repository";

@Injectable()
export class AuthService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private userRepository: IUserRepository,
    private jwtService: JwtService,
    private mapper: AuthMapper,
  ) {}

  async validateUser(email: string, password: string): Promise<TUser> {
    const { password: hashedPassword, ...user } =
      await this.userRepository.expectOneByEmail(email);

    const match = await compare(password, hashedPassword);

    if (match) return user;

    throw new UserNotFoundException();
  }

  async login(user: TUser): Promise<LoginResponseDto> {
    const payload = { id: user.id };

    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: configService.getJwtRefreshTokenDuration(),
    });

    return this.mapper.toLoginResponseDto(user, accessToken, refreshToken);
  }

  async register({
    email,
    password,
    firstName,
    lastName,
  }: RegisterDtoRequest): Promise<RegisterResponseDto> {
    const hashedPassword = await hash(password, SALT_ROUNDS);

    const user = this.userRepository.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });

    try {
      const savedUser = await this.userRepository.save(user);

      return this.mapper.toRegisterResponseDto(savedUser);
    } catch (e) {
      if (e.code === "23505") throw new EmailAlreadyExistsException();
      else new InternalServerErrorException(e);
    }
  }

  getLoggedInUser({ id }: TCurrentUser) {
    return this.mapper.toLoggedInUser({ id });
  }
}
