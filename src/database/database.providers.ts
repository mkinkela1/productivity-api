import { config } from "dotenv";
import { DataSource } from "typeorm";

config();

export const databaseProviders = [
  {
    provide: "DATA_SOURCE",
    useFactory: async () => {
      const dataSource = new DataSource({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        entities: [__dirname + "/../**/*.entity{.ts,.js}"],
        migrations: [__dirname + "/../migrations/**/*{.ts,.js}"],
        migrationsTableName: "migrations",
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
];
