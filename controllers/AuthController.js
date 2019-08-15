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
        const password = req.body.password;
        const email = req.body.email;
        UserModel.findOne({ email: email }).lean().exec(function (err, user) {
            if (err) {
                return res.status(500).json({ message: 'Server error', error: err });
            }
            const auth_error = (password == '' || password == null || !user);

            if (!auth_error) {
                bcrypt.compareSync(password, user.password);
            }
            return res.status(404).json({ message: 'Wrong e-mail or passaword' });
        }
        })
}
}