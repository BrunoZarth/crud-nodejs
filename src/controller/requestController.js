const client = require("../config/config.js");
const requestDAO = require("../dao/requestDAO.js")(client);
//const requestService = require("../service/requestService.js"); // need implementation


const getAllRequest = async (req, res) => {
    try {
        const results = await requestDAO.findAll();
        if (results.length === 0) {
            res.status(404).json({ message: 'No requests found' });
        } else {
            res.status(200).json(results);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while getting requests' });
    }
};

const getRequestById = async (req, res) => {
    const id = req.params.id;
    try {
        const results = await requestDAO.findOne(id);
        if (results.length === 0) {
            res.status(404).json({ message: 'request not found' });
        } else {
            res.status(200).json(results);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while getting the request by ID' });
    }
}

const createRequest = async (req, res) => {
    //const newrequest = requestService.requestGenerate(req.body);

    const quantity = req.body.quantity;
    const productId = req.body.product_id;

    const newrequest = {
        "quantity": quantity,
        "product_id": productId,
    }

    try {
        const results = await requestDAO.save(newrequest);
        if (results.length === 0) {
            res.status(400).json({ message: 'request could not be created' });
        } else {
            res.status(201).json(results);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while creating the request' });
    }
}

const updateRequest = async (req, res) => {
    const request = {
        "id": req.params.id,
        "quantity": req.body.quantity,
        "product_id": req.body.productId
    };
    try {
        const results = await requestDAO.updateOne(request);
        if (results.length === 0) {
            res.status(400).json({ message: 'request could not be updated' });
        } else {
            res.status(200).json(results);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while updating the request' });
    }
}

const deleteRequestById = async (req, res) => {
    const id = req.params.id;
    try {
        const results = await requestDAO.deleteOne(id);
        if (results.length === 0) {
            res.status(404).json({ message: `request not found` });
        } else {
            res.status(204).end();
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while deleting the request' });
    }
};


module.exports = {
    getAllRequest,
    getRequestById,
    createRequest,
    updateRequest,
    deleteRequestById,
};
