import { Router } from "express";
import { GetNoteData, Update } from "../Controllers/NoteController.js";

const router = Router();

router.get("/:idSubject", GetNoteData);
router.patch("/:idSubject", Update);

export default router;