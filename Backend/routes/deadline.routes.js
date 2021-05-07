import { Router } from "express";
import { FindUK, Complete, Uncomplete, Create, Update, Delete } from "../Controllers/DeadlineController.js";

const router = Router();

router.get("/", FindUK);
router.post("/", Create);
router.patch("/complete/:idDeadline", Complete);
router.patch("/uncomplete/:idDeadline", Uncomplete);
router.patch("/:idDeadline", Update);
router.delete("/:idDeadline", Delete);

export default router;