import express from "express";
import homeRoute from "./src/routes/homeRoutes";

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
    this.app.use("/", homeRoute);
  }
}

export default new App().app;
