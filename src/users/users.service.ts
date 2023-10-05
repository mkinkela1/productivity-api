import { Inject, Injectable } from "@nestjs/common";
import { USERS_REPOSITORY } from "src/common/constants";
import { TUser } from "src/entities/user.entity";
import { IUserRepository } from "src/users/users.repository";

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private userRepository: IUserRepository,
  ) {}

  async getAll(): Promise<TUser[]> {
    return this.userRepository.find();
  }
}
