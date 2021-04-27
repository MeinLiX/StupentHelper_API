import { models } from '../config/dbConnect.js';
import { TException, TNotFoundModel } from '../utils/templatesRes.js'
const ClassType = models.classType;

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
    try {
        const DeletedClassType = ClassType.destroy({
            where: {
                idClassType: req.params.idClassType,
                userId: req.user.idUser
            }
        });
        if (await DeletedClassType > 0) {
            res.status(200).json({
                success: true,
                message: "ClassType deleted."
            });
        } else {
            TNotFoundModel(req, res, "ClassType");
        };
    } catch (err) {
        TException(req, res, err);
    };
}