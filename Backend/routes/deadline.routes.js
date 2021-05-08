import { Router } from "express";
import { FindUK, Create, Update, Delete } from "../Controllers/DeadlineController.js";

const router = Router();

router.get("/", FindUK);
router.post("/", Create);
router.patch("/:idDeadline", Update);
router.delete("/:idDeadline", Delete);

export default router;