import { v4 as uuid } from "uuid";
import { models } from '../config/dbConnect.js';
import { TException, TNotFoundModel, TNotNullAndEmpty } from '../utils/templatesRes.js'

const Schedule = models.schedule;
const Class = models.Class;

function ParseDateHHMM(strDate) {
    const regex = /^([0-1][0-9]|2[0-3]):([0-5][0-9]|60)$/g;
    const valid = regex.test(strDate);
    if (valid) {
        let time = strDate.split(":");
        let res = new Date(`0001-01-01T${time[0]}:${time[1]}:00+0000`);
        return res;
    } else {
        return null;
    }
}


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
                    parity: el.parity,
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
    if (!subjectId || !weekdayId || !classtypeId || !teacherId) {
        res.status(200).json({
            success: false,
            error: {
                message:
                    `` +
                    `${subjectId == null ? " Subject" : ""}` +
                    `${weekdayId == null ? " Weekday" : ""}` +
                    `${classtypeId == null ? " ClassType" : ""}` +
                    `${teacherId == null ? " Teacher" : ""}` +
                    ` not found, schedule can't be created.`
            }
        });
        return;
    }
    parity = parity ?? null;
    try {
        //validation id's:
        const [CurrSubject, CurrWeekday, CurrClassType, CurrTeacher] = await Promise.all([
            models.subject.findOne({
                where:
                {
                    idSubject: subjectId,
                    userId: req.user.idUser
                }
            }),
            models.weekday.findOne({
                where:
                {
                    idWeekday: weekdayId
                }
            }),
            models.classtype.findOne({
                where:
                {
                    idClassType: classtypeId,
                    userId: req.user.idUser
                }
            }),
            models.teacher.findOne({
                where:
                {
                    idTeacher: teacherId,
                    userId: req.user.idUser
                }
            }),
        ]);

        if (!CurrSubject || !CurrWeekday || !CurrClassType || !CurrTeacher) {
            res.status(200).json({
                success: false,
                error: {
                    message:
                        `` +
                        `${CurrSubject == null ? " Subject" : ""}` +
                        `${CurrWeekday == null ? " Weekday" : ""}` +
                        `${CurrClassType == null ? " ClassType" : ""}` +
                        `${CurrTeacher == null ? " Teacher" : ""}` +
                        ` not found, schedule can't be created.`
                }
            });
            return;
        }

        //DATE validation:
        const DateCkassFrom = ParseDateHHMM($class.from);
        const DateClassTo = ParseDateHHMM($class.to);
        if (!DateCkassFrom || !DateClassTo) {
            res.status(200).json({
                success: false,
                error: {
                    message: "Class 'from'|'to' invalid."
                }
            });
            return;
        }
        //Try creation:
        const CreateClass = await Class.create(
            {
                idClass: uuid(),
                number: $class?.number,
                from: DateCkassFrom,
                to: DateClassTo
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
        const DeletedSchedule = await Schedule.findOne({
            where: {
                idSchedule: req.params.idSchedule,
                userId: req.user.idUser
            }
        });
        if (!DeletedSchedule) {
            TNotFoundModel(req, res, "Schedule");
            return;
        }
        const isDeletedSchedule = await DeletedSchedule.destroy();
        models.Class.destroy({
            where: {
                idClass: DeletedSchedule.classId
            }
        })
        if (isDeletedSchedule) {
            res.status(200).json({
                success: true,
                message: "Schedule deleted."
            });
        } else {
            throw new Error("Can't delete Schedule. Trouble with db..");
        };
    } catch (err) {
        TException(req, res, err);
    };
}