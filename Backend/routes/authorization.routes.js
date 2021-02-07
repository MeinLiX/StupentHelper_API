import {Router} from "express";
import {login, register, logout} from "../Controllers/AuthorizationController.js";
import {checkAuthenticated,checkNoAuthenticated} from "../config/passport.js";

const router = Router();

router.post("/login", checkNoAuthenticated, login);
router.post("/register", checkNoAuthenticated, register);
router.post("/logout", checkAuthenticated, logout);

export default router;