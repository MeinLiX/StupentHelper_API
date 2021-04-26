import {Router} from "express";
import {FindUK,Create,Update,Delete} from "../Controllers/SubjectController.js";

const router = Router();

router.get("/", FindUK);
router.post("/", Create);
router.patch("/:idSubject", Update);
router.delete("/:idSubject", Delete);

export default router;