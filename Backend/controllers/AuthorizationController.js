import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";
import {models} from '../config/dbConnect.js';

const User = models.user;
const saltRounds = 6;

const emailPattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

function Verify({email, password}) {
    if (!email) {
        return {
            success: false,
            status: 200,
            error: {
                message: `Field email can not be empty!`
            }
        };
    } else if (!password) {
        return {
            success: false,
            status: 200,
            error: {
                message: `Field password can not be empty!`
            }

        };
    }
    if (!emailPattern.test(email.trim())) {
        return {
            success: false,
            status: 200,
            error: {
                message: `Invalid email.`
            }
        };
    }
    return {
        success: true,
        status: 200,
        error: {
            message: `validation confirm`
        }
    }
}

export async function login(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let verify = Verify(req.body);

    if (!verify.success) {
        res.status(verify.status).json({
            success: verify.success,
            error: verify.error
        })
        return;
    }

    try {
        let FoundUser = await User.findOne({where: {email: email}});
        if (FoundUser) {
            await bcrypt.compare(password, FoundUser.password, (error, result) => {
                if (error) {
                    res.status(500).json({
                        success: false,
                        error: {
                            message: error.message
                        }
                    });
                }
                if (result) {
                    req.logIn({
                        id: FoundUser.idUser,
                        email: FoundUser.email,
                        password: FoundUser.password
                    }, (err) => {
                        if (err) {
                            res.status(500).json({
                                success: false,
                                error: {
                                    message: err.message
                                }
                            });
                        } else {
                            //res.header('Access-Control-Allow-Credentials','true');
                            res.status(200).json({
                                success: true,
                                message: `Password is correct.`
                            });
                        }
                    })
                } else {
                    res.status(200).json({
                        success: false,
                        error: {
                            message: `Password isn't correct.`
                        }
                    });
                }
            });
        } else {
            res.status(200).json({
                success: false,
                error: {
                    message: `User not found.`
                }
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err
        });
    }
}

export async function register(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let verify = Verify(req.body);

    if (!verify.success) {
        res.status(verify.status).json({
            success: verify.success,
            error: verify.error
        })
        return;
    }

    try {
        let FoundUser = await User.findOne({where: {email: email}});
        if (!FoundUser) {
            let CreateUser = await User.create({
                idUser: uuid(),
                username: req.body.username | "user", //TODO: trim username and validation.
                email: email,
                password: await bcrypt.hash(password, saltRounds)
            });
            if (CreateUser) {
                req.logIn({
                    id: CreateUser.idUser,
                    email: CreateUser.email,
                    password: CreateUser.password
                }, (err) => {
                    if (err) {
                        res.status(500).json({
                            success: false,
                            error: {
                                message: err.message
                            }
                        });
                    } else {
                       // res.header('Access-Control-Allow-Credentials','true');
                        res.status(200).json({
                            success: true,
                            message: "User is created."
                        });
                    }
                })
            } else {
                res.status(200).json({
                    success: false,
                    error: {
                        message: "idk"
                    }
                });
            }
        } else {
            res.status(200).json({
                success: false,
                error: {
                    message: "Email is taken."
                }
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err
        });
    }
}