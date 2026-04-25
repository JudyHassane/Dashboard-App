import "reflect-metadata";
import { DataSource } from "typeorm";
import { ENV } from "../../config/env";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: ENV.PG_HOST,
  port: Number(ENV.PG_PORT),
  username: ENV.PG_USER,
  password: ENV.PG_PASSWORD,
  database: ENV.PG_DATABASE,
  synchronize: false,
  logging: false,
  entities: ["src/orm/entities/**/*.entity.ts"],
  subscribers: [],
  migrations: ["src/orm/migrations/**/*.ts"],
  namingStrategy: new SnakeNamingStrategy(),
});
