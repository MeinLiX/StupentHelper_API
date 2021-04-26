import { v4 as uuid } from "uuid";
import { models } from '../config/dbConnect.js';
import { TException, TNotFoundModel } from '../utils/templatesRes.js'

const Subject = models.subject;

export async function FindUK(req, res) {
    try {
        const Subjects = await Subject.findAll({
            where: {
                userId: req.user.idUser
            },
            order: [
                ['name', 'ASC']
            ]
        });
        if (Subjects) {
            res.status(200).json({
                success: true,
                data: Subjects
            });
        } else {
            TNotFoundModel(req, res, "Subject");
        }
    } catch (err) {
        TException(req, res, err);
    };
}

export async function Create(req, res) {
    if (!req.body.name || req.body.name == "") {
        res.status(200).json({
            success: false,
            error: {
                message: "The name field can not be empty."
            }
        });
        return;
    };
    try {
        const FoundSubject = await Subject.findOne({ where: { name: req.body.name } });
        if (FoundSubject) {
            res.status(200).json({
                success: false,
                error: {
                    message: "This name is already taken."
                }
            });
            return;
        }

        const CreateSubject = await Subject.create(
            {
                idSubject: uuid(),
                name: req.body.name,
                userId: req.user.idUser
            });

        if (CreateSubject) {
            res.status(200).json({
                success: true,
                message: "Subject is created.",
                data: CreateSubject
            });
        } else {
            res.status(200).json({
                success: false,
                error: {
                    message: "Trouble with DB.."
                }
            });
        };
    } catch (err) {
        TException(req, res, err);
    };
}

export async function Update(req, res) {
    try {
        const FoundSubject = await Subject.findOne({
            where: {
                idSubject: req.params.idSubject,
                userId: req.user.idUser
            }
        });
        const UpdateSubject = await Subject.update(
            {
                name: req.body.name
            },
            {
                where: {
                    idSubject: req.params.idSubject,
                    userId: req.user.idUser
                }
            }
        );
        if (UpdateSubject > 0) {
            res.status(200).json({
                success: true,
                message: "Subject updated."
            });
        } else if (FoundSubject) {
            res.status(200).json({
                success: true,
                message: "Subject not changed."
            });
        } else {
            TNotFoundModel(req, res, "Subject");
        };
    } catch (err) {
        TException(req, res, err);
    };
}

export async function Delete(req, res) {
    try {
        const DeletedSubject = Subject.destroy({
            where: {
                idSubject: req.params.idSubject,
                userId: req.user.idUser
            }
        });
        if (await DeletedSubject > 0) {
            res.status(200).json({
                success: true,
                message: "Subject deleted."
            });
        } else {
            TNotFoundModel(req, res, "Subject");
        };
    } catch (err) {
        TException(req, res, err);
    };
}