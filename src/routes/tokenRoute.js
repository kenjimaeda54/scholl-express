import { Router } from "express";
import tokenController from "../controllers/tokenController";

const route = new Router();

route.post("/", tokenController.store);

export default route;
