import express from 'express';
import bodyparser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';

import initializePassport from "./config/passport.js";
import {sequelize} from './config/dbConnect.js';
import config from './config/config.js';
import routes from './routes/index.js';
import logger from "./logger.js";

const {json, urlencoded} = bodyparser;

;(async () => {
    const app = express();
    initializePassport(passport);
    app.use(json());
    app.use(urlencoded({extended: true}));
    app.use(
        session({
            ...config.session
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(cors({
        origin: "http://localhost:3000",
        credentials: true,
    }));

    logger(app);
    
    app.use('/api', routes);

    try {
        if (await sequelize.sync()) {
            app.listen(config.app.port, () => {
                console.log(`Server is listen on ${config.app.port} \n`);
            });
        }
    } catch (err) {
        console.log(err);
    }
})();
