const client = require("../config/config.js");

async function getAllUser() {
    try {
        const results = await client.query("SELECT * FROM users");
        return results.rows;
    } catch(err){
        console.error(err);
        throw err;
    }
};

async function getUserById(id) {
    try {
        const results = await client.query(`SELECT * FROM users WHERE id = $1`, [id]);
        return results.rows;
    } catch(err){
        console.error(err);
        throw err;
    }
};

async function createUser(name, email) {
    try {
        const results = await client.query(
            `INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *`,
            [name, email]
        );
        return results.rows;
    } catch(err){
        console.error(err);
        throw err;
    }
};

async function updateUser(id, name, email) {
    try {
        const results = await client.query(
            "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
            [name, email, id]
        );
        return results.rows;
    } catch(err){
        console.error(err);
        throw err;
    }
};

async function deleteUserById(id) {
    try {
        const results = await client.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
        return results.rows;
    } catch(err){
        console.error(err);
        throw err;
    }
};

module.exports = {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUserById,
};
