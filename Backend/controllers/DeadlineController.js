import { v4 as uuid } from "uuid";
import { models } from '../config/dbConnect.js';
import { TException, TNotFoundModel, TNotNullAndEmpty } from '../utils/templatesRes.js'

const Deadline = models.deadline;

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
    try {

    } catch (err) {
        TException(req, res, err);
    };
}
async function ForUpdateIsDone(req, res, model, isDone = false) {

}

export async function Complete(req, res) {
    try {

    } catch (err) {
        TException(req, res, err);
    };
}

export async function Uncomplete(req, res) {
    try {

    } catch (err) {
        TException(req, res, err);
    };
}

export async function Update(req, res) {
    try {

    } catch (err) {
        TException(req, res, err);
    };
}

export async function Delete(req, res) {
    try {
        const DeletedDeadline = await Deadline.destroy({
            where: {
                idDeadline: req.params.idDeadline,
                userId: req.user.idUser
            }
        });
        if (DeletedDeadline > 0) {
            res.status(200).json({
                success: true,
                message: "Deadline deleted."
            });
        } else {
            TNotFoundModel(req, res, "Deadline");
        };
    } catch (err) {
        TException(req, res, err);
    };
}