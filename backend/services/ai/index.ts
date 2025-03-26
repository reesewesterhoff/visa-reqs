import express, { Express } from "express";
import dotenv from "dotenv";
import { routes } from "./src/routes";
import { errorHandler } from "./src/middleware/error";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import { api } from "./api-spec/spec";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const router = express.Router();

app.use(express.json());
app.use(router);
app.use(errorHandler);

// only use docs if not in production
if (!process.env.NODE_ENV) {
  app.use("/documentation", swaggerUi.serve, swaggerUi.setup(api));
}

routes(router);

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
