import "reflect-metadata";
import app from "./app";
import { ENV } from "./config/env";
import { AppDataSource } from "./orm/config/ormconfig";

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");

    app.listen(ENV.PORT, () => {
      console.log(`Server running on port ${ENV.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error", error);
    process.exit(1);
  });
