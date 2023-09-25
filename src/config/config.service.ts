import { config } from "dotenv";
import { DataSourceOptions } from "typeorm/data-source/DataSourceOptions";

config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue("PORT", true);
  }

  public isProduction() {
    const mode = this.getValue("MODE", false);
    return mode != "dev";
  }

  public getJwtTokenSecret() {
    return this.getValue("JWT_TOKEN_SECRET", true);
  }

  public getJwtTokenDuration() {
    return this.getValue("JWT_TOKEN_DURATION", true);
  }

  public getJwtRefreshTokenSecret() {
    return this.getValue("JWT_REFRESH_TOKEN_SECRET", true);
  }

  public getJwtRefreshTokenDuration() {
    return this.getValue("JWT_REFRESH_TOKEN_DURATION", true);
  }

  public getEmailConfirmationTokenSecret() {
    return this.getValue("JWT_EMAIL_CONFIRMATION_TOKEN_SECRET", true);
  }

  public getEmailConfirmationTokenDuration() {
    return this.getValue("JWT_EMAIL_CONFIRMATION_TOKEN_DURATION", true);
  }

  public getTypeOrmConfig(): DataSourceOptions {
    return {
      type: "postgres",

      host: this.getValue("POSTGRES_HOST"),
      port: parseInt(this.getValue("POSTGRES_PORT")),
      username: this.getValue("POSTGRES_USER"),
      password: this.getValue("POSTGRES_PASSWORD"),
      database: this.getValue("POSTGRES_DB"),

      migrationsTableName: "migrations",

      entities: [__dirname + "/../**/*.entity{.ts,.js}"],
      migrations: [__dirname + "/../migrations/**/*{.ts,.js}"],

      ssl: this.isProduction(),
      logging: !this.isProduction(),
      synchronize: false,
    };
  }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }
}

const configService = new ConfigService(process.env).ensureValues([
  "POSTGRES_HOST",
  "POSTGRES_PORT",
  "POSTGRES_USER",
  "POSTGRES_PASSWORD",
  "POSTGRES_DB",
]);

export { configService };
