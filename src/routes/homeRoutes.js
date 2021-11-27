import { Router } from "express";
import home from "../controllers/homeController";

const router = new Router();

router.get("/", home.index);

export default router;
