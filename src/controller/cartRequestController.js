const client = require("../config/config.js");
const cartRequestDAO = require("../dao/cartRequestDAO.js")(client);
//const cartRequestService = require("../service/cartRequestService.js"); // need implementation


const getAllCartRequest = async (req, res) => {
    try {
        const results = await cartRequestDAO.findAll();
        if (results.length === 0) {
            res.status(404).json({ message: 'No cartRequests found' });
        } else {
            res.status(200).json(results);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while getting cartRequests' });
    }
};

const getCartRequestByCartId = async (req, res) => {
    const id = req.params.id;
    try {
        const results = await cartRequestDAO.findByCartId(id);
        if (results.length === 0) {
            res.status(404).json({ message: 'cartRequest not found' });
        } else {
            res.status(200).json(results);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while getting the cartRequest by ID' });
    }
}

const getCartRequestByRequestId = async (req, res) => {
    const id = req.params.id;
    try {
        const results = await cartRequestDAO.findByRequestId(id);
        if (results.length === 0) {
            res.status(404).json({ message: 'cartRequest not found' });
        } else {
            res.status(200).json(results);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while getting the cartRequest by ID' });
    }
}

const createCartRequest = async (req, res) => {
    //const newcartRequest = cartRequestService.cartRequestGenerate(req.body);

    const cartId = req.body.cart_id;
    const requestId = req.body.request_id;

    const newcartRequest = {
        "cart_id": cartId,
        "request_id": requestId,
    }

    try {
        const results = await cartRequestDAO.save(newcartRequest);
        if (results.length === 0) {
            res.status(400).json({ message: 'cartRequest could not be created' });
        } else {
            res.status(201).json(results);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while creating the cartRequest' });
    }
}

const updateCartRequest = async (req, res) => {
    const cartRequest = {
        "id": req.params.id,
        "cart_id": req.body.cart_id,
        "request_id": req.body.request_id
    };
    try {
        const results = await cartRequestDAO.updateOne(cartRequest);
        if (results.length === 0) {
            res.status(400).json({ message: 'cartRequest could not be updated' });
        } else {
            res.status(200).json(results);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while updating the cartRequest' });
    }
}

const deleteByRequestIdCartId = async (req, res) => {
    const cartId= req.params.cartId;
    const requestId= req.params.requestId;
    try {
        const results = await cartRequestDAO.deleteByRequestIdCartId(cartId, requestId);
        if (results.length === 0) {
            res.status(404).json({ message: `cartRequest not found` });
        } else {
            res.status(204).end();
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while deleting the cartRequest' });
    }
};


module.exports = {
    getAllCartRequest,
    getCartRequestByCartId,
    getCartRequestByRequestId,
    createCartRequest,
    updateCartRequest,
    deleteByRequestIdCartId,
};
