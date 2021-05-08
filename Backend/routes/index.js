import { Router } from "express";
import { checkAuthenticated } from "../config/passport.js";

import { Pong, CheckAuthenticated, Me} from "../controllers/RootController.js"

import authorizationRoutes from "./authorization.routes.js";
import usersRoutes from "./users.routes.js";
import subjectsRoutes from "./subjects.routes.js";
import teachersRoutes from "./teachers.routes.js";
import classTypesRoutes from "./classTypes.routes.js";
import scheduleRoutes from "./schedules.routes.js";
import deadlineRoutes from "./deadline.routes.js";

const router = Router();

router.get('/ping', Pong);
router.get('/isAuthenticated', CheckAuthenticated);

router.use('/', authorizationRoutes);

router.use(checkAuthenticated);

router.get('/me', Me);

router.use('/users', usersRoutes);
router.use('/subjects', subjectsRoutes);
router.use('/teachers', teachersRoutes);
router.use('/classtypes', classTypesRoutes);
router.use('/schedules', scheduleRoutes);
router.use('/deadlines', deadlineRoutes);

export default router;