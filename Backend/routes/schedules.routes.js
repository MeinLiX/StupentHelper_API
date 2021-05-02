import {Router} from "express";
import {FindUK,Create,Delete} from "../Controllers/ScheduleController.js";

const router = Router();

router.get("/", FindUK);
router.post("/", Create);
router.delete("/:idSchedule", Delete);

export default router;