import { isNullOrUndefined } from "src/common/helpers";
import { User } from "src/entities/user.entity";
import { UserNotFoundException } from "src/exceptions/user.exceptions";
import { Repository } from "typeorm/repository/Repository";

export interface IUserRepository extends Repository<User> {
  this: Repository<User>;
  expectOneByEmail(email: string): Promise<User>;
  expectOneById(id: string): Promise<User>;
}

export const customUserRepository: Pick<
  IUserRepository,
  "expectOneByEmail" | "expectOneById"
> = {
  async expectOneByEmail(email: string): Promise<User> {
    const user = await this.findOne({ where: { email } });

    if (isNullOrUndefined(user)) {
      throw new UserNotFoundException();
    }

    return user;
  },

  async expectOneById(id: string): Promise<User> {
    const user = await this.findOne({ where: { id } });

    if (isNullOrUndefined(user)) {
      throw new UserNotFoundException();
    }

    return user;
  },
};
