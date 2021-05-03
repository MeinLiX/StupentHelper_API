import { v4 as uuid } from "uuid";
import { models } from '../config/dbConnect.js';
import { TException, TNotFoundModel, TNotNullAndEmpty, TSearchModelbyForeignKey} from '../utils/templatesRes.js'

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
    let { name } = req.body;
    name = name?.trim();
    if (TNotNullAndEmpty(req, res, name, "name")) {
        return;
    };
    try {
        const FoundSubjectSameName = await Subject.findOne({
            where: {
                name: name,
                userId: req.user.idUser
            }
        });
        if (FoundSubjectSameName) {
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
                name: name,
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
    let { name } = req.body;
    name = name?.trim();
    if (TNotNullAndEmpty(req, res, name, "name")) {
        return;
    };
    try {
        const FoundSubjectSameName = await Subject.findOne({
            where: {
                name: name,
                userId: req.user.idUser
            }
        });
        if (FoundSubjectSameName) {
            res.status(200).json({
                success: false,
                error: {
                    message: "This name is already taken."
                }
            });
            return;
        }
        const UpdateSubject = await Subject.update(
            {
                name: name
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
        } else {
            TNotFoundModel(req, res, "Subject");
        };
    } catch (err) {
        TException(req, res, err);
    };
}

export async function Delete(req, res) {
    try {
        if (await TSearchModelbyForeignKey(models.schedule, req, res,
            {
                subjectId: req.params.idSubject,
            }
        )) {
            return;
        }
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