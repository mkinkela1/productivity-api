import { User } from "src/entities/user.entity";
import { DATA_SOURCE, USERS_REPOSITORY } from "src/utils/constants";
import { DataSource } from "typeorm";

export const userProvider = [
  {
    provide: USERS_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [DATA_SOURCE],
  },
];
