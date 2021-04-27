import {Router} from "express";
import {FindUK,Create,Update,Delete} from "../Controllers/ClassTypeController.js";

const router = Router();

router.get("/", FindUK);
router.post("/", Create);
router.patch("/:idClassType", Update);
router.delete("/:idClassType", Delete);

export default router;