import * as express from "express";
import mongoose from "mongoose";
import employeeRoute from "./routes/employeeRoute";
import cors = require("cors");
import 'dotenv/config'

const app = express();

async function bootstrap() {
  app.use(express.json());
  app.use(cors())

  const user = process.env.MONGODB_USER;
  const password = process.env.MONGODB_PASSWORD;
  const host = process.env.MONGODB_HOST;
  const port = process.env.PORT;

  try {
    await mongoose.connect(`mongodb://${user}:${password}@${host}:${port}`,);
    console.log("MongoDB connected...");
  } catch (err) {
    console.log(err);
  }

  app.use("/api", employeeRoute);


  app.listen(3000, () => console.log("server running on port 3000"));
}

bootstrap();