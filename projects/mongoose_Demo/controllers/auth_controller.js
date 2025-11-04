const userModel = require('../models/user_model')

exports.login = async (req, res) => {
    try {
        const newuser = new userModel(req.body);
        const saveResponse = await newuser.save();
        res.status(201).json({ message: 'user added!!', newuser, saveResponse })
    } catch (err) {
        console.error(err);
        res.status(400).send({ error: err.message });
    }
}