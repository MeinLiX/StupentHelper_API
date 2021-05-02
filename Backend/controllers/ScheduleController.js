import { v4 as uuid } from "uuid";
import { models } from '../config/dbConnect.js';
import { TException, TNotFoundModel, TNotNullAndEmpty } from '../utils/templatesRes.js'

const Schedule = models.schedule;
const Class = models.Class;

export async function FindUK(req, res) {
    try {
        const Schedules = await Schedule.findAll({
            where: {
                userId: req.user.idUser
            },
        });
        let data = [[], [], [], [], [], [], []]
        if (Schedules) {
            const MapPromises = Schedules.map(async el => {

                const [CurrClass, CurrSubject, CurrWeekday, CurrClassType, CurrTeacher] = await Promise.all([
                    models.Class.findOne({
                        where:
                        {
                            idClass: el.classId
                        }
                    }),
                    models.subject.findOne({
                        where:
                        {
                            idSubject: el.subjectId,
                            userId: el.userId
                        }
                    }),
                    models.weekday.findOne({
                        where:
                        {
                            idWeekday: el.weekdayId
                        }
                    }),
                    models.classtype.findOne({
                        where:
                        {
                            idClassType: el.classtypeId,
                            userId: el.userId
                        }
                    }),
                    models.teacher.findOne({
                        where:
                        {
                            idTeacher: el.teacherId,
                            userId: el.userId
                        }
                    }),
                ]);

                if (!CurrClass || !CurrSubject || !CurrWeekday || !CurrClassType || !CurrTeacher) {
                    res.status(500).json({
                        success: false,
                        error: {
                            message: "Some element's not found, schedule incorrect. Trouble with DB.."
                        }
                    });
                    return;
                }

                data[parseInt(CurrWeekday.idWeekday) - 1].push({
                    idSchedule: el.idSchedule,
                    $class: CurrClass,
                    subject: CurrSubject,
                    weekday: CurrWeekday,
                    classtype: CurrClassType,
                    teacher: CurrTeacher,
                    userId: el.userId
                });
            });

            await Promise.all(MapPromises);

            res.status(200).json({
                success: true,
                data: data
            });
        } else {
            TNotFoundModel(req, res, "Schedule");
        }
    } catch (err) {
        TException(req, res, err);
    };

}

export async function Create(req, res) {
    let { $class, subjectId, weekdayId, classtypeId, teacherId, parity } = req.body;
    console.log(req.body);
    parity = parity ?? null;
    try {
        //validation id's here:



        //Try creation:
        const CreateClass = await Class.create(
            {
                idClass: uuid(),
                number: $class?.number,
                from: new Date(0, 0, 0, $class?.from?.split(':')[0], $class?.from?.split(':')[1]),
                to: new Date(0, 0, 0, $class?.to?.split(':')[0], $class?.to?.split(':')[1])
            });
        if (!CreateClass) {
            res.status(500).json({
                success: false,
                error: {
                    message: "Class not created. Trouble with DB.."
                }
            });
            return;
        }
        const CreateSchedule = await Schedule.create(
            {
                idSchedule: uuid(),
                parity: parity,
                classId: CreateClass.idClass,
                subjectId: subjectId,
                weekdayId: weekdayId,
                classtypeId: classtypeId,
                teacherId: teacherId,
                userId: req.user.idUser
            });
        console.log(CreateSchedule, CreateClass);
        if (CreateSchedule) {
            res.status(200).json({
                success: true,
                message: "Schedule is created.",
                data: CreateSchedule
            });
        } else {
            res.status(500).json({
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

export async function Delete(req, res) {
    try {
        const DeletedSchedule = Schedule.destroy({
            where: {
                idSchedule: req.params.idSchedule,
                userId: req.user.idUser
            }
        });
        if (await DeletedSchedule > 0) {
            res.status(200).json({
                success: true,
                message: "Schedule deleted."
            });
        } else {
            TNotFoundModel(req, res, "Schedule");
        };
    } catch (err) {
        TException(req, res, err);
    };
}