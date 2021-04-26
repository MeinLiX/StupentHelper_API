import {Router} from "express";
import {FindUK,Create,Update,Delete} from "../Controllers/TeacherController.js";

const router = Router();

router.get("/", FindUK);
router.post("/", Create);
router.patch("/:idTeacher", Update);
router.delete("/:idTeacher", Delete);

export default router;