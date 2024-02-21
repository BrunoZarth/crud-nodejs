const client = require("../config/config.js");
const UserDAO = require("../dao/userDAO.js")(client);
const crypto = require('crypto');
const jwt = require("jsonwebtoken"); 
const userService = require("../service/userService.js"); // need implementation


const getAllUser = async (req, res) => {
    try {
        const results = await UserDAO.findAll();
        if (results.length === 0) {
            res.status(404).json({ message: 'No users found' });
        } else {
            res.status(200).json(results);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while getting users' });
    }
};

const getUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const results = await UserDAO.findOne(id);
        if (results.length === 0) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json(results);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while getting the user by ID' });
    }
}

const createUser = async (req, res) => {
    //const newUser = userService.userGenerate(req.body);

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    const newUser = {
        "name": name,
        "email": email,
        "salt": salt,
        "hash": hash
    }

    try {
        const results = await UserDAO.save(newUser);
        if (results.length === 0) {
            res.status(400).json({ message: 'User could not be created' });
        } else {
            res.status(201).json(results);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while creating the user' });
    }
}

const updateUser = async (req, res) => {
    const user = {
        "id": req.params.id,
        "name": req.body.name,
        "email": req.body.email
    };
    try {
        const results = await UserDAO.updateOne(user);
        if (results.length === 0) {
            res.status(400).json({ message: 'User could not be updated' });
        } else {
            res.status(200).json(results);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while updating the user' });
    }
}

const deleteUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const results = await UserDAO.deleteOne(id);
        if (results.length === 0) {
            res.status(404).json({ message: `User not found` });
        } else {
            res.status(204).end();
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while deleting the user' });
    }
};

// Authentication
const login = async (req, res) => {
    const PRIVATE_KEY = "your-private-key";
    try {
        const user = await UserDAO.findOneByEmail(req.body.email);
        
        const inputHash = crypto.pbkdf2Sync(req.body.password, user[0].salt, 1000, 64, 'sha512').toString('hex');

        if (inputHash === user[0].hash) {
            const token = jwt.sign({ userId: user[0].id }, PRIVATE_KEY, { expiresIn: '15m' });
            res.json({ auth: true, token: token, result: user[0] });
        } else {
            res.json({ auth: false, token: null });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Invalid email or password.' });
    }
}


module.exports = {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUserById,
    login,
};
