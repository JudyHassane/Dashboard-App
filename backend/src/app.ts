import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { AppDataSource } from "./orm/config/ormconfig";
import routes from "./routes";
import { errorHandler } from "./middleware/errorHandler.middleware";
import { ENV } from "./config/env";

const app = express();

app.use(
  cors({
    origin: ENV.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

app.use(errorHandler);

export default app;
