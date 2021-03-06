import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";
import {models} from '../config/dbConnect.js';
import {TException} from '../utils/templatesRes.js'

const User = models.user;
const saltRounds = 6;

const emailPattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const passwordProp = {
    minLength: 8,
    maxLength: 70
}
const usernameProp = {
    minLength: 2,
    maxLength: 45
}
const emailProp = {
    maxLength: 45
}

function Verify({email, password, username}) {
    if (!email) {
        return {
            success: false,
            status: 200,
            error: {
                message: `The email field can not be empty.`
            }
        };
    } else if (!password) {
        return {
            success: false,
            status: 200,
            error: {
                message: `The password field can not be empty.`
            }

        };
    }
    if (password.length < passwordProp.minLength) {
        return {
            success: false,
            status: 200,
            error: {
                message: `Password should contain at least ${passwordProp.minLength} characters.`
            }
        };
    } else if (password.length > passwordProp.maxLength) {
        return {
            success: false,
            status: 200,
            error: {
                message: `Password must not exceed ${passwordProp.maxLength} characters.`
            }
        };
    }

    if (username) {
        if (username.length < usernameProp.minLength) {
            return {
                success: false,
                status: 200,
                error: {
                    message: `Username should contain at least ${usernameProp.minLength} characters.`
                }
            };
        } else if (username.length > usernameProp.maxLength) {
            return {
                success: false,
                status: 200,
                error: {
                    message: `Username must not exceed ${usernameProp.maxLength} characters.`
                }
            };
        }
    }

    if (email.length > emailProp.maxLength) {
        return {
            success: false,
            status: 200,
            error: {
                message: `Email must not exceed ${emailProp.maxLength} characters.`
            }
        };
    } else if (!emailPattern.test(email.trim())) {
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
            message: `validation confirm.`
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
                            message: `Incorrect email or password.`
                        }
                    });
                }
            });
        } else {
            res.status(200).json({
                success: false,
                error: {
                    message: `Incorrect email or password.`
                }
            });
        }
    } catch (err) {
        TException(req,res,err);
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
                username: req.body.username,
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
                        message: "Trouble with DB.."
                    }
                });
            }
        } else {
            res.status(200).json({
                success: false,
                error: {
                    message: "This email is already taken."
                }
            });
        }
    } catch (err) {
        TException(req,res,err);
    }
}

export async function logout(req, res) {
    req.logout();
    res.status(200).json({
        success: true,
        message: "User logged out."
    });
}