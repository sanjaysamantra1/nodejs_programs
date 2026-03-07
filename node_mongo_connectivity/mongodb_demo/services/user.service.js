const { getDB } = require('../config/db.config');
const { ObjectId } = require('mongodb');

const getAllUsers = async () => {
    const db = getDB();
    return await db.collection('users').find().toArray();
}
const getUserById = async (id) => {
    const db = getDB();
    return await db.collection('users').findOne({ _id: new ObjectId(id) })
}

const createUser = async (userData) => {
    const db = getDB();
    const result = await db.collection('users').insertOne(userData);
    return result.insertedId;
}

const updateUser = async (id, userData) => {
    const db = getDB();
    const result = await db.collection('users').updateOne({ _id: new ObjectId(id) }, { $set: userData });
    return result.modifiedCount > 0;
}

const deleteUser = async (id) => {
    const db = getDB();
    const result = await db.collection('users').deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}