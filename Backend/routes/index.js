import {Router} from "express";
import {checkAuthenticated} from "../config/passport.js";

import usersRoutes from "./users.routes.js";
import authorizationRoutes from "./authorization.routes.js";


const router = Router();

router.use('/', authorizationRoutes);
router.use(checkAuthenticated);

router.use('/users', usersRoutes);

export default router;