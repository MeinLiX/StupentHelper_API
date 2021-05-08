import Sequelize from 'sequelize';
import { v4 as uuid } from "uuid";
import { models } from '../config/dbConnect.js';
import { TException, TNotFoundModel, TNotNullAndEmpty, TSearchModelbyForeignKey } from '../utils/templatesRes.js'

const ClassType = models.classtype;

export async function FindUK(req, res) {
    try {
        const ClassTypes = await ClassType.findAll({
            where: {
                userId: req.user.idUser
            },
            order: [
                ['typeName', 'ASC']
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
    let { typeName } = req.body;
    typeName = typeName?.trim();
    if (TNotNullAndEmpty(req, res, typeName, "typeName")) {
        return;
    };
    try {
        const FoundClassTypeSameTypeName = await ClassType.findOne({
            where: {
                typeName: typeName,
                userId: req.user.idUser
            }
        });
        if (FoundClassTypeSameTypeName) {
            res.status(200).json({
                success: false,
                error: {
                    message: "This type is already taken."
                }
            });
            return;
        }

        const CreateClassType = await ClassType.create(
            {
                idClassType: uuid(),
                typeName: typeName,
                userId: req.user.idUser
            });

        if (CreateClassType) {
            res.status(200).json({
                success: true,
                message: "ClassType is created.",
                data: ClassType
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
    let { typeName } = req.body;
    typeName = typeName?.trim();
    if (TNotNullAndEmpty(req, res, typeName, "typeName")) {
        return;
    };
    try {
        const FoundClassTypeSameTypeName = await ClassType.findOne({
            where: {
                typeName: typeName,
                userId: req.user.idUser,
                [Sequelize.Op.not]: [
                    { 
                        idClassType: req.params.idClassType 
                    }
                ]
            }
        });
        if (FoundClassTypeSameTypeName) {
            res.status(200).json({
                success: false,
                error: {
                    message: "This type name is already taken."
                }
            });
            return;
        }
        const FoundClassType = await ClassType.findOne({
            where: {
                idClassType: req.params.idClassType,
                userId: req.user.idUser
            }
        });
        if (!FoundClassType) {
            TNotFoundModel(req, res, "Class type");
            return;
        }
        const UpdateClassType = await FoundClassType.update(
            {
                typeName: typeName
            }
        );
        if (UpdateClassType) {
            res.status(200).json({
                success: true,
                message: "Class type updated."
            });
        } else {
            throw new Error("Trouble with DB..");
        };
    } catch (err) {
        TException(req, res, err);
    };
}

export async function Delete(req, res) {
    try {
        if (await TSearchModelbyForeignKey(models.schedule, req, res,
            {
                classtypeId: req.params.idClassType,
            }
        )) {
            return;
        }
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