import { LoggedInUserResponseDto } from "src/auth/dto/response/logged-in-user.response-dto";
import { LoginResponseDto } from "src/auth/dto/response/login.response-dto";
import { RegisterResponseDto } from "src/auth/dto/response/register.response-dto";
import { TUser } from "src/entities/user.entity";

export class AuthMapper {
  toLoginResponseDto(
    { firstName, lastName }: TUser,
    accessToken: string,
    refreshToken: string,
  ) {
    return new LoginResponseDto({
      firstName,
      lastName,
      accessToken,
      refreshToken,
    });
  }

  toRegisterResponseDto({ email, firstName, lastName }: TUser) {
    return new RegisterResponseDto({
      email,
      firstName,
      lastName,
    });
  }

  toLoggedInUser({ id, firstName, lastName }: TUser) {
    return new LoggedInUserResponseDto({ id, firstName, lastName });
  }
}
