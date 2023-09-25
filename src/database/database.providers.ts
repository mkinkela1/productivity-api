import { config } from "dotenv";
import { configService } from "src/config/config.service";
import { DATA_SOURCE } from "src/utils/constants";
import { DataSource } from "typeorm";

config();

const dataSource = new DataSource(configService.getTypeOrmConfig());
dataSource.initialize();

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: () => dataSource,
  },
];

export { dataSource };
