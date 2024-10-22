const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const userModel = require('../model/user-model');
const { JWT_SECRET_TOKEN, JWT_SECRET_TOKEN_REFRESH } = require('../config/JWT_SECRET_KEY');

const refreshTokens = new Set();

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
            const token = jwt.sign({ id: user._id }, JWT_SECRET_TOKEN, { expiresIn: '2m' })
            const refreshToken = jwt.sign({ id: user._id }, JWT_SECRET_TOKEN_REFRESH, { expiresIn: '4m' })
            refreshTokens.add(refreshToken)
            res.send({ auth: true, expiresIn: 60 * 2, token: token });
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
};
// refresh
exports.refresh = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken || !refreshTokens.has(refreshToken)) {
        res.status(500).send({ auth: false, token: 'No refreshToken found' })
    }

    try {
        const decode = await jsonwebtoken.verify(refreshToken, JWT_SECRET_TOKEN_REFRESH);

        const newRefreshToken = jsonwebtoken.sign({ id: user._id }, JWT_SECRET_TOKEN_REFRESH, { expiresIn: '2m' })

        refreshTokens.delete(refreshToken)
        refreshTokens.add(newRefreshToken)

        res.status(200).send({ auth: false, token: newRefreshToken })
    } catch (err) {

    }

};
exports.logout = async (req, res) => {
    try {
        res.status(200).send('logged out succesfully')
    } catch (error) {
        res.status(500).send('Server error');
    }
};