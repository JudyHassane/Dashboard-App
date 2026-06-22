import express from "express";
import cors from "cors";
import { ENV } from "./config/env";
import cookieParser from "cookie-parser";
import "./utils/response/CustomSuccess";
import routes from "./routes";
import { errorHandler } from "./middleware/common/errorHandler.middleware";

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
