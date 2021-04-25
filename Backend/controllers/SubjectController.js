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
   
}

export async function Update(req, res) {

}

export async function Delete(req, res) {

}