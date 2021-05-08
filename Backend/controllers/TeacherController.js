import { v4 as uuid } from "uuid";
import { models } from '../config/dbConnect.js';
import { TException, TNotFoundModel, TNotNullAndEmpty, TSearchModelbyForeignKey } from '../utils/templatesRes.js'

const Teacher = models.teacher;

function GetData({ surname, name, middle_name }) {
    let newData;
    if (surname)
        newData = {
            ...newData,
            surname: surname.trim() == "" ? null : surname.trim()
        }
    if (name)
        newData = {
            ...newData,
            name: name.trim() == "" ? null : name.trim()
        }
    if (middle_name)
        newData = {
            ...newData,
            'middle name': middle_name.trim() == "" ? null : middle_name.trim()
        }

    return newData;
}

export async function FindUK(req, res) {
    try {
        const Teachers = await Teacher.findAll({
            where: {
                userId: req.user.idUser
            },
            order: [
                ['surname', 'ASC']
            ]
        });
        if (Teachers) {
            res.status(200).json({
                success: true,
                data: Teachers
            });
        } else {
            TNotFoundModel(req, res, "Teacher");
        }
    } catch (err) {
        TException(req, res, err);
    };
}

export async function Create(req, res) {
    let newData = GetData(req.body);
    if (TNotNullAndEmpty(req, res, newData?.surname, "surname")) {
        return;
    };
    try {
        const CreateTeacher = await Teacher.create(
            {
                idTeacher: uuid(),
                ...newData,
                userId: req.user.idUser
            });
        if (CreateTeacher) {
            res.status(200).json({
                success: true,
                message: "Teacher is created.",
                data: CreateTeacher
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
    let newData = GetData(req.body);
    if (TNotNullAndEmpty(req, res, newData?.surname, "surname")) {
        return;
    };
    try {
        const FoundTeacher = await Teacher.findOne({
            where: {
                idTeacher: req.params.idTeacher,
                userId: req.user.idUser
            }
        });
        const UpdateTeacher = await FoundTeacher.update(
            newData
        );
        if (UpdateTeacher) {
            res.status(200).json({
                success: true,
                message: "Teacher updated."
            });
        } else {
            TNotFoundModel(req, res, "Teacher");
        };
    } catch (err) {
        TException(req, res, err);
    };
}

export async function Delete(req, res) {
    try {
        if (await TSearchModelbyForeignKey(models.schedule, req, res,
            {
                teacherId: req.params.idTeacher,
            }
        )) {
            return;
        }
        const DeletedTeacher = Teacher.destroy({
            where: {
                idTeacher: req.params.idTeacher,
                userId: req.user.idUser
            }
        });
        if (await DeletedTeacher > 0) {
            res.status(200).json({
                success: true,
                message: "Teacher deleted."
            });
        } else {
            TNotFoundModel(req, res, "Teacher");
        };
    } catch (err) {
        TException(req, res, err);
    };
}