import {Router} from "express";
import {FindUK,Create,Update,Delete} from "../Controllers/SubjectController.js";

const router = Router();

router.get("/", FindUK);
router.post("/", Create);
router.put("/", Update);
router.delete("/", Delete);

export default router;