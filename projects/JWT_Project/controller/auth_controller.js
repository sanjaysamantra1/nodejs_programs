const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const userModel = require('../model/user-model');
const { JWT_KEY } = require('../config/JWT_SECRET_KEY');

exports.register = async (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    try {
        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(200).send("User Added Succesfully");
    } catch (error) {
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            res.status(200).send({ auth: false, msg: 'No User Found,Please resgister' });
        } else {
            const passIsValid = bcrypt.compareSync(req.body.password, user.password);

            if (!passIsValid) {
                res.send({ auth: false, msg: 'Invalid Password' })
            }

            // incase both email and password are correct, generate JWT token and send
            let token = jsonwebtoken.sign({ id: user._id }, JWT_KEY, { expiresIn: 60 * 2 });
            console.log(token)
            res.send({ auth: true, expiresIn: 60 * 2, token: token });

        }
    } catch (error) {
        res.status(500).send('Server error');
    }
};
exports.logout = async (req, res) => {
    try {
        res.status(200).send('logged out succesfully')
    } catch (error) {
        res.status(500).send('Server error');
    }
};