import {Router} from "express";
import {checkAuthenticated} from "../config/passport.js";

import authorizationRoutes from "./authorization.routes.js";
import usersRoutes from "./users.routes.js";

const router = Router();

router.get('/ping',(req, res)=>res.status(200).json({message:'pong!'}));

router.use('/', authorizationRoutes);
router.use(checkAuthenticated);

router.use('/users', usersRoutes);

export default router;