import express from "express";
import router from "./routes";
import { APP_PORT, APP_URL } from "../config";
import CustomErrorHandler from "./services/CustomErrorHandler";
import errorHandler from "./middlewares/errorHandler";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Welcome to the Milk Subscription API");
});

// Error handling middleware
app.use(errorHandler);

app.listen(APP_PORT, () => {
  console.log(`Server is running on ${APP_URL}`);
});