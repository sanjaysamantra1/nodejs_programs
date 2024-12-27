const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../model/user_model');
const RefreshTokenModel = require('../model/token_model');
const { REFRESH_TOKEN_SECRET } = require('../config/JWT_SECRET_KEY');
const { generateAccessToken, generateRefreshToken } = require('../util/jwt_util');

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
            console.log('user not found')
            res.status(401).send({ auth: false, msg: 'No User Found,Please resgister' });
        } else {
            const passIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passIsValid) {
                res.send({ auth: false, msg: 'Invalid Password' })
            }
            // incase both email and password are correct, generate JWT token and send
            const token = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            // Save refresh token in database
            const tokenDocument = new RefreshTokenModel({ userId: user._id, token: refreshToken });
            await tokenDocument.save();
            res.send({ auth: true, expiresIn: 60 * 2, token, refreshToken });
        }
    } catch (error) {
        res.status(500).send(error);
    }
};
// refresh
exports.refresh = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token is required.' });
    }
    const tokenDocument = await RefreshTokenModel.findOne({ token: refreshToken });
    if (!tokenDocument) {
        return res.status(403).json({ message: 'Invalid refresh token.' });
    }
    try {
        const payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
        const newAccessToken = generateAccessToken(payload);
        const newRefreshToken = generateAccessToken(payload);

        // Save refresh token in database
        let updateResponse = await RefreshTokenModel.updateOne({ userId: payload.userId }, { token: newRefreshToken });
        res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    } catch (err) {
        res.status(403).json({ message: 'Invalid or expired refresh token.' });
    }
};
exports.logout = async (req, res) => {
    // Revoke the refresh token to prevent new access tokens
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required.' });
    }
    let deleteResponse = await RefreshTokenModel.deleteOne({ token: refreshToken });
    if (deleteResponse.deletedCount > 0) {
        res.status(200).json('Employee Deleted Succesfully');
    } else {
        res.status(403).json({ message: 'Invalid or expired refresh token.' });
    }
};