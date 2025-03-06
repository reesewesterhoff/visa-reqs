import express, { Express } from "express";
import dotenv from "dotenv";
import { routes } from "./src/routes";
import { errorHandler } from "./src/middleware/error";
import "express-async-errors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const router = express.Router();

app.use(express.json());
app.use(router);
app.use(errorHandler);

routes(router);

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
