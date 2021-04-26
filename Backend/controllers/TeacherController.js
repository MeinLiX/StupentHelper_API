import {v4 as uuid} from "uuid";
import { models } from '../config/dbConnect.js';
import { TException, TNotFoundModel } from '../utils/templatesRes.js'

const Teacher = models.teacher;

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
    let {surname,name,middle_name} = req.body;
    
    if (!surname || surname?.trim() == "") {
        res.status(200).json({
            success: false,
            error: {
                message: "The surname field can not be empty."
            }
        });
        return;
    };
    try {
        const CreateTeacher = await Teacher.create(
            {
                idTeacher: uuid(),
                surname: surname.trim(),
                name: name?.trim(),
                'middle name': middle_name?.trim(),
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

}

export async function Delete(req, res) {
    try {
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