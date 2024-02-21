const client = require("../config/config.js");
const productDAO = require("../dao/productDAO.js")(client);
//const productService = require("../service/productService.js"); // need implementation


const getAllProduct = async (req, res) => {
    try {
        const results = await productDAO.findAll();
        if (results.length === 0) {
            res.status(404).json({ message: 'No products found' });
        } else {
            res.status(200).json(results);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while getting products' });
    }
};

const getProductById = async (req, res) => {
    const id = req.params.id;
    try {
        const results = await productDAO.findOne(id);
        if (results.length === 0) {
            res.status(404).json({ message: 'product not found' });
        } else {
            res.status(200).json(results);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while getting the product by ID' });
    }
}

const createProduct = async (req, res) => {
    //const newproduct = productService.productGenerate(req.body);

    const name = req.body.name;
    const price = req.body.price;

    const newProduct = {
        "name": name,
        "price": price,
    }

    try {
        const results = await productDAO.save(newProduct);
        if (results.length === 0) {
            res.status(400).json({ message: 'product could not be created' });
        } else {
            res.status(201).json(results);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while creating the product' });
    }
}

const updateProduct = async (req, res) => {
    const product = {
        "id": req.params.id,
        "name": req.body.name,
        "price": req.body.price
    };
    try {
        const results = await productDAO.updateOne(product);
        if (results.length === 0) {
            res.status(400).json({ message: 'product could not be updated' });
        } else {
            res.status(200).json(results);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while updating the product' });
    }
}

const deleteProductById = async (req, res) => {
    const id = req.params.id;
    try {
        const results = await productDAO.deleteOne(id);
        if (results.length === 0) {
            res.status(404).json({ message: `product not found` });
        } else {
            res.status(204).end();
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while deleting the product' });
    }
};


module.exports = {
    getAllProduct,
    getProductById,
    createProduct,
    updateProduct,
    deleteProductById,
};
