import dotenv from "dotenv";
import type { StringValue } from "ms";

const envFile =
  process.env.NODE_ENV === "production"
    ? "config/prod.env"
    : process.env.NODE_ENV === "stage"
      ? "config/stage.env"
      : ".env";

dotenv.config({ path: envFile });

export const ENV = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || "3000",

  PG_HOST: process.env.PG_HOST!,
  PG_PORT: Number(process.env.PG_PORT),
  PG_USER: process.env.PG_USER!,
  PG_PASSWORD: process.env.PG_PASSWORD!,
  PG_DATABASE: process.env.PG_DATABASE!,

  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET!,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET!,
  ACCESS_TOKEN_EXPIRATION: (process.env.ACCESS_TOKEN_EXPIRATION ||
    "15m") as StringValue,
  REFRESH_TOKEN_EXPIRATION: (process.env.REFRESH_TOKEN_EXPIRATION ||
    "7d") as StringValue,

  FRONTEND_URL: process.env.FRONTEND_URL,
  BACKEND_URL: process.env.BACKEND_URL,
};
