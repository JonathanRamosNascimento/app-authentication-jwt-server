const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const consts = require('../consts');


module.exports = {
    register: async function (req, res) {
        try {
            let u = await UserModel.findOne({ email: req.body.email });
            if (!u) {
                const user = new UserModel(req.body);
                user.password = bcrypt.hashSync(req.body.password, consts.bcryptSalts);
                await user.save();
                delete user.password;
                res.status(200).json(user);
            } else {
                res.status(403).json({ message: 'Email already registered', error: {} });
            }
        } catch (e) {
            res.status(500).json({ message: 'Error while saving the user', error: e });
        }
    },

    login: function (req, res) {

    }
}