const database = require('../model/database.json');
const fs = require('fs')

const saveTODB = (data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./model/database.json', data, (error, data) => {
            if (error) {
                reject('Error writing to File')
            } else {
                resolve('File written successfully')
            }
        })
    })
}

const allUsers = (req, res) => {
    const users = database;
    res.status(200).json({ data: users })
}

// Get newUser

const newUser = async (req, res) => {
    const name = req.body.name;
    const gender = req.body.gender;
    const id = database.length + 1
    const user = {
        id: id,
        name: name,
        gender: gender,
    }

    database.push(user)
    await saveTODB(JSON.stringify(database, null, 2))
    res.status(201).json({
        message: 'User created successfully',
        data: user
    })
}

// Create oneUser

const oneUser = (req, res) => {
    const id = Number(req.params.id);
    const user = database.find((el) => el.id === id)
    if (user == null) {
        return
        res.status(404).json({ message: "User not found" })
    }
    res.status(200).json({ data: user })
}

// Update user 

const updateUser = (req, res) => {
    const id = Number(req.params.id);
    const user = database.find((el) => el.id === id);
    const name = req.body.name;
    const gender = req.body.gender;

    user.name = name || user.name;
    user.gender = gender || user.gender;
    database.push(user)
    saveTODB(JSON.stringify(database, null, 2))
    res.status(200).json({ message: 'User updated successfully', data: user })
}

// Delete User

const removeUser = (req, res) => {
    const id = Number(req.params.id);
    const indexUser = database.findIndex((el) => el.id === id);

    database.splice(indexUser, 1);
    saveTODB(JSON.stringify(database, null, 2))
    res.status(200).json({ message: 'User deleted successfully' })
}




module.exports = {
    allUsers,
    newUser,
    oneUser,
    updateUser,
    removeUser
}