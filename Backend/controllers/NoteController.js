import { models } from '../config/dbConnect.js';
import { TException, TNotFoundModel } from '../utils/templatesRes.js'

const Notes = models.notes;
const Subject = models.subject;

export async function GetNoteData(req, res) {
    try {
        
    } catch (err) {
        TException(req, res, err);
    }
}

export async function Update(req, res) {
    try {

    } catch (err) {
        TException(req, res, err);
    }
}
