import { Router } from "express";
import studentController from "../controllers/studentController";
import LoginRequired from "../middleware/LoginRequired";

const router = new Router();

router.get("/", studentController.index);
router.get("/:id", studentController.show);
router.post("/", LoginRequired, studentController.store);
router.put("/:id", LoginRequired, studentController.update);
router.delete("/:id", LoginRequired, studentController.destroy);

export default router;
