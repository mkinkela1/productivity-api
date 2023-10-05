import { DATA_SOURCE, USERS_REPOSITORY } from "src/common/constants";
import { User } from "src/entities/user.entity";
import { customUserRepository } from "src/users/users.repository";
import { DataSource } from "typeorm";

export const userProvider = [
  {
    provide: USERS_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(User).extend(customUserRepository),
    inject: [DATA_SOURCE],
  },
];
