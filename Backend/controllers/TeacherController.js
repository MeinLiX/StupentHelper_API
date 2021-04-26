import { models } from '../config/dbConnect.js';
import { TException, TNotFoundModel } from '../utils/templatesRes.js'

const Teacher = models.teacher;

export async function FindUK(req,res){
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

export async function Create(req,res){

}

export async function Update(req,res){

}

export async function Delete(req,res){

}