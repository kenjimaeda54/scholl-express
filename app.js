import dotenv from "dotenv";
dotenv.config();
import "./src/database";
import express from "express";
import homeRoutes from "./src/routes/homeRoutes";
import userRoutes from "./src/routes/userRoutes";
import tokenRoute from "./src/routes/tokenRoute";
import studentRoute from "./src/routes/studentRoutes";

class App {
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  routes() {
    this.app.use("/", homeRoutes);
    this.app.use("/users", userRoutes);
    this.app.use("/tokens", tokenRoute);
    this.app.use("/students", studentRoute);
  }
}

export default new App().app;
