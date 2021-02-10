import {Router} from "express";
import {update, findAll, findOne} from "../Controllers/UserController.js";

const router = Router();

router.get("/", findAll);
router.get('/:idUser', findOne);
router.put("/:idUser", update); //TODO

export default router;