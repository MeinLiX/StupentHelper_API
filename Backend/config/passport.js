import bcrypt from "bcrypt";
import {Strategy as LocalStrategy} from "passport-local";
import {models} from '../config/dbConnect.js';

const User = models.user;

export function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.status(403).send({
        error:
            {
                message: 'Access denied, please log in!'
            }
    });
}
export function checkNoAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        return next()
    }
    res.status(403).send({
        error:
            {
                message: 'You already log in!'
            }
    });

}

function initialize(passport) {
    const authenticateUser = async (email, password, done) => {
        const user = await User.findOne({where: {email: email}});
        if (user == null) {
            return done(null, false, {
                message: 'No user with that email.'
            });
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, {
                    message: 'Password incorrect.'
                });
            }
        } catch (err) {
            return done(err);
        }
    }

    passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser(async (id, done) => {
        try {
            let user = await User.findByPk(id);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false, {message: 'User not found.'});
            }
        } catch (err) {
            return done(err);
        }
    })
}

export default initialize;