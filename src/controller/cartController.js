const client = require("../config/config.js");
const cartDAO = require("../dao/cartDAO.js")(client);
//const cartService = require("../service/cartService.js"); // need implementation


const getAllCart = async (req, res) => {
    try {
        const results = await cartDAO.findAll();
        if (results.length === 0) {
            res.status(404).json({ message: 'No carts found' });
        } else {
            res.status(200).json(results);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while getting carts' });
    }
};

const getCartById = async (req, res) => {
    const id = req.params.id;
    try {
        const results = await cartDAO.findOne(id);
        if (results.length === 0) {
            res.status(404).json({ message: 'cart not found' });
        } else {
            res.status(200).json(results);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while getting the cart by ID' });
    }
}

const createCart = async (req, res) => {
    const usersId = req.body.users_id;
    const createdAt = new Date();

    const newcart = {
        "users_id": usersId,
        "createdAt": createdAt,
    }

    try {
        const results = await cartDAO.save(newcart);
        if (results.length === 0) {
            res.status(400).json({ message: 'cart could not be created' });
        } else {
            res.status(201).json(results);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while creating the cart' });
    }
}



const updateCart = async (req, res) => {
    const cart = {
        "id": req.params.id,
        "users_id": req.body.users_id,
        "createdAt": req.body.createdAt
    };
    try {
        const results = await cartDAO.updateOne(cart);
        if (results.length === 0) {
            res.status(400).json({ message: 'cart could not be updated' });
        } else {
            res.status(200).json(results);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while updating the cart' });
    }
}

const deleteCartById = async (req, res) => {
    const id = req.params.id;
    try {
        const results = await cartDAO.deleteOne(id);
        if (results.length === 0) {
            res.status(404).json({ message: `cart not found` });
        } else {
            res.status(204).end();
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while deleting the cart' });
    }
};


module.exports = {
    getAllCart,
    getCartById,
    createCart,
    updateCart,
    deleteCartById,
};
