import { models } from '../config/dbConnect.js';
import { TException, TNotFoundModel } from '../utils/templatesRes.js'
const ClassType = models.class_type;

export async function FindUK(req, res) {
    try {
        const ClassTypes = await ClassType.findAll({
            where: {
                userId: req.user.idUser
            },
            order: [
                ['type', 'ASC']
            ]
        });
        if (ClassTypes) {
            res.status(200).json({
                success: true,
                data: ClassTypes
            });
        } else {
            TNotFoundModel(req, res, "ClassType");
        }
    } catch (err) {
        TException(req, res, err);
    };
}

export async function Create(req, res) {

}

export async function Update(req, res) {

}

export async function Delete(req, res) {

}