import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  PORT: process.env.PORT || "3000",
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET as string,
};
