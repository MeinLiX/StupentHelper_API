import { v4 as uuid } from "uuid";
import { models } from '../config/dbConnect.js';
import { TException, TNotFoundModel, TNotNullAndEmpty } from '../utils/templatesRes.js'

const Deadline = models.deadline;

function GetData({ date, task, isDone, subjectId }) {
    let newData;
    if (date)
        newData = {
            ...newData,
            date: new Date(date)
        }
    if (typeof task == "string")
        newData = {
            ...newData,
            task: task?.trim()
        }
    if (isDone !== undefined && isDone != null)
        newData = {
            ...newData,
            isDone
        }
    else {
        newData = {
            ...newData,
            isDone: false
        }
    }
    if (subjectId)
        newData = {
            ...newData,
            subjectId
        }

    return newData;
}

export async function FindUK(req, res) {
    try {
        const Deadlines = await Deadline.findAll({
            where: {
                userId: req.user.idUser
            },
            order: [
                ['date', 'ASC']
            ]
        });
        if (Deadlines) {
            res.status(200).json({
                success: true,
                data: Deadlines
            });
        } else {
            TNotFoundModel(req, res, "Deadline");
        }
    } catch (err) {
        TException(req, res, err);
    };
}

export async function Create(req, res) {
    let newData = GetData(req.body);
    if (TNotNullAndEmpty(req, res, newData?.date, "date") ||
        TNotNullAndEmpty(req, res, newData?.task, "task")) {
        return;
    };

    try {
        if (newData?.subjectId) {
            const Subjects = await models.subject.findOne({
                where: {
                    idSubject: newData?.subjectId,
                    userId: req.user.idUser
                }
            });
            if (!Subjects) {
                TNotFoundModel(req, res, "SubjectId");
                return;
            }
        }

        const CreateDeadline = await Deadline.create(
            {
                idDeadline: uuid(),
                ...newData,
                userId: req.user.idUser
            });

        if (CreateDeadline) {
            res.status(200).json({
                success: true,
                message: "Deadline is created.",
                data: CreateDeadline
            });
        } else {
            throw new Error("Trouble with db..");
        };
    } catch (err) {
        TException(req, res, err);
    };
}

export async function Update(req, res) {
    let newData = GetData(req.body);
    if (typeof newData?.task == "string")
        if (TNotNullAndEmpty(req, res, newData?.task, "task")) {
            return;
        }

    try {
        console.log(newData);
        if (newData?.subjectId) {
            const Subjects = await models.subject.findOne({
                where: {
                    idSubject: newData?.subjectId,
                    userId: req.user.idUser
                }
            });
            if (!Subjects) {
                TNotFoundModel(req, res, "SubjectId");
                return;
            }
        }
        const FoundDeadline = await Deadline.findOne({
            where: {
                idDeadline: req.params.idDeadline,
                userId: req.user.idUser
            }
        });

        const CreateDeadline = await Deadline.update(
            newData,
            {
                where: {
                    idDeadline: req.params.idDeadline,
                    userId: req.user.idUser
                }
            });

        if (CreateDeadline > 0) {
            res.status(200).json({
                success: true,
                message: "Deadline is updated."
            });
        } else if (FoundDeadline) {
            res.status(200).json({
                success: true,
                message: "Deadline not changed."
            });
        } else {
            TNotFoundModel(req, res, "Deadline");
        };
    } catch (err) {
        TException(req, res, err);
    };
}

export async function Delete(req, res) {
    try {
        const DeletedDeadline = await Deadline.findOne({
            where: {
                idDeadline: req.params.idDeadline,
                userId: req.user.idUser
            }
        });
        if (!DeletedDeadline) {
            TNotFoundModel(req, res, "Deadline");
            return;
        }
        const isDeletedDeadline = await DeletedDeadline.destroy();
        models.Class.destroy({
            where: {
                idClass: DeletedDeadline.classId
            }
        })
        if (isDeletedDeadline) {
            res.status(200).json({
                success: true,
                message: "Deadline deleted."
            });
        } else {
            throw new Error("Can't delete Deadline. Trouble with db..");
        };
    } catch (err) {
        TException(req, res, err);
    };
}