import {models} from '../config/dbConnect.js';

const User = models.user;

export async function findAll(req, res) {
    try {
        res.send(await User.findAll({attributes: ['idUser', 'username', 'email']}));
    } catch (err) {
        res.status(500).send({
            error: {
                message: err.message
            }
        });
    }
}

export async function findOne(req, res) {
    const idUser = req.params.idUser;

    try {
        let user = await User.findByPk(idUser,{attributes: ['idUser', 'username', 'email']});
        if (user) {
            res.send(user);
        } else {
            res.status(500).send({message: "User not found."})
        }
    } catch (err) {
        res.status(500).send({
            error: {
                message: err.message
            }
        });
    }
}

export async function update(req, res) {

}