import {Router} from "express";
import {checkAuthenticated} from "../config/passport.js";

import {Pong, CheckAuthenticated} from "../controllers/RootController.js"
import authorizationRoutes from "./authorization.routes.js";
import usersRoutes from "./users.routes.js";

const router = Router();

router.get('/ping', Pong);
router.get('/isAuthenticated', CheckAuthenticated);

router.use('/', authorizationRoutes);
router.use(checkAuthenticated);

router.use('/users', usersRoutes);

export default router;