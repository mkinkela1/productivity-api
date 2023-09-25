import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { hash } from "bcrypt";
import { TUser, User } from "src/entities/user.entity";
import {
  EmailAlreadyExistsException,
  UserNotFoundException,
} from "src/exceptions/UserExceptions";
import { SALT_ROUNDS, USERS_REPOSITORY } from "src/utils/constants";
import { Repository } from "typeorm/repository/Repository";

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private userRepository: Repository<User>,
  ) {}

  async expectOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) throw new UserNotFoundException();

    return user;
  }

  async create(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<TUser> {
    const hashedPassword = await hash(password, SALT_ROUNDS);

    const user = this.userRepository.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });

    try {
      return await this.userRepository.save(user);
    } catch (e) {
      if (e.code === "23505") throw new EmailAlreadyExistsException();
      else new InternalServerErrorException(e);
    }
  }
}
