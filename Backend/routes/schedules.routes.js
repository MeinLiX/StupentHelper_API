import {Router} from "express";
import {FindUK,Create,Update ,Delete} from "../Controllers/ScheduleController.js";

const router = Router();

router.get("/", FindUK);
router.post("/", Create);
router.patch("/:idSchedule", Update);
router.delete("/:idSchedule", Delete);

export default router;