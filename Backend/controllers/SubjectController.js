import { v4 as uuid } from "uuid";
import { models } from '../config/dbConnect.js';

const Subject = models.subject;

export async function FindUK(req, res) {
    try {
        let Subjects = await Subject.findAll({
            where: {
                userId: req.user.idUser
            }
        });
        if (Subjects) {
            res.status(200).send({
                success: true,
                data: Subjects
            });
        }
    } catch (err) {
        res.status(500).send({
            success: false,
            error: {
                message: err.message
            }
        });
    }
}

export async function Create(req, res) {
    if (!req.body.name) {
        res.status(200).json({
            success: false,
            error: {
                message: "The name field can not be empty."
            }
        });
        return;
    }
    try {
        let CreateSubject = await Subject.create({
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
                    message: "This name already taken"
                },
                ...CreateSubject
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,error:{
            message: err.message
        }
        });
    }
}

export async function Update(req, res) {

}

export async function Delete(req, res) {

}