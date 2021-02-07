import {models} from '../config/dbConnect.js';
const User = models.user;

export async function findAll(req, res) {
    res.send(await User.findAll());
}

export async function findOne(req, res) {
    const idUser = req.params.idUser;

    try {
        let user = await User.findByPk(idUser);
        if (user) {
            res.send(user);
        } else {
            res.status(500).send({message: "User not found."})
        }

    } catch (err) {
        res.status(500).send(err);
    }
}

export async function update(req, res) {

}