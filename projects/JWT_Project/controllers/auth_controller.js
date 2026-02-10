const bcrypt = require('bcrypt');
const userModel = require('../models/user_model');
const { generateAccessToken, generateRefreshToken, verifyToken } = require('../utils/jwt_utils');
const { REFRESH_TOKEN_SECRET } = require('../config/jwt.config');

exports.register = async (req, res) => {
    let { name, email, password, phone, role } = req.body;
    console.log('auth controller')
    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        password = bcrypt.hashSync(password, 8);
        console.log(name, email, password, phone, role)
        const userDocument = new userModel({ name, email, password, phone, role });
        await userDocument.save();
        res.status(201).json({ message: 'User registered Successfully!!!' });
    } catch (err) {
        res.status(500).json(err);
    }
}
exports.login = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            res.status(401).send({ auth: false, msg: 'No User Found, Plz Register' })
        } else {
            const passIsValid = bcrypt.compareSync(req.body.password, user.password);

            if (!passIsValid) {
                res.status(401).send({ auth: false, msg: 'invalid password' })
            } else { // both email and password are correct
                const accessToken = generateAccessToken(user._id, user.name);
                const refreshToken = generateRefreshToken(user._id, user.name);
                // console.log(accessToken, refreshToken)

                await userModel.updateOne({ email: req.body.email }, { $set: { refreshToken } });

                res.cookie('refreshToken', refreshToken, { httpOnly: true });
                res.json({ auth: true, accessToken, refreshToken });
            }
        }
    } catch (err) {
        res.status(500).json({ message: 'Login failed', err });
    }
}
exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.status(401).json({ msg: 'No Referesh Token Found' });

    try {
        const user = await userModel.findOne({ refreshToken });
        if (!user) return res.status(403).send('No User found with the provided Refresh Token');

        const decoded = verifyToken(refreshToken, REFRESH_TOKEN_SECRET);
        if (!decoded) return res.status(403).send('Provided Refresh Token is not correct');
        const newAccessToken = generateAccessToken(user._id, user.name);
        const newRefreshToken = generateRefreshToken(user._id, user.name);
        await userModel.updateOne({ email: user.email }, { $set: { 'refreshToken': newRefreshToken } });
        res.cookie('refreshToken', newRefreshToken, { httpOnly: true });
        res.json({ auth: true, newAccessToken, newRefreshToken });
    } catch (err) {
        res.status(500).json({ msg: 'Server Error', err });
    }
}
exports.logout = async (req, res) => {
    let refreshToken = req.cookies?.refreshToken;
    try {
        if (!refreshToken) {
            res.status(403).json({ msg: 'No Refresh Token ' });
        }
        await userModel.updateOne({ refreshToken }, { $unset: { refreshToken: '' } });
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        res.json({ message: 'Logged out' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', err });
    }
}
