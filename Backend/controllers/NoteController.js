import { models } from '../config/dbConnect.js';
import { TException, TNotFoundModel, TNotNullAndEmpty } from '../utils/templatesRes.js'

const Notes = models.notes;
const Subject = models.subject;

export async function GetNoteData(req, res) {
    try {
        const FoundSubject = await Subject.findOne({
            where: {
                idSubject: req.params.idSubject,
                userId: req.user.idUser
            }
        });
        if (!FoundSubject) {
            TNotFoundModel(req, res, "Subject");
            return;
        };

        const FoundNote = await Notes.findOne({
            where: {
                subjectId: FoundSubject.idSubject
            }
        });
        if(FoundNote){
            res.status(200).json({
                success: true,
                data: FoundNote
            });
        }else{
            TNotFoundModel(req, res, "Note");
            return;
        }
    } catch (err) {
        TException(req, res, err);
    }
}

export async function Update(req, res) {
    try {
        if (TNotNullAndEmpty(req, res, req.body?.content, "content")) {
            return;
        };

        const FoundSubject = await Subject.findOne({
            where: {
                idSubject: req.params.idSubject,
                userId: req.user.idUser
            }
        });
        if (!FoundSubject) {
            TNotFoundModel(req, res, "Subject");
            return;
        };

        const FoundNote = await Notes.findOne({
            where: {
                subjectId: FoundSubject.idSubject
            }
        });
        if (!FoundNote) {
            TNotFoundModel(req, res, "Note");
            return;
        };

        const updateNote = await FoundNote.update({
            content: req.body?.content
        });

        if(updateNote){
            res.status(200).json({
                success: true,
                data: updateNote
            });
        }else{
            res.status(200).json({
                success: true,
                message: "Note not changed."
            });
        };  
    } catch (err) {
        TException(req, res, err);
    }
}
