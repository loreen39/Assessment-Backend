const productModel = require('../Models/product');
const validator = require('validator');
const {default:mongoose} = require('mongoose');
const fs = require("fs").promises;

// Let the admin add a product
const addProduct = async (req, res) => {
    const {name, description, price} = req.body;

    // Check if any of the required fields are missing or empty
    if (!name || !description || !price) {
        return res.status(400).json({error: "All fields are required and cannot be empty!"});
    }

    try{
        const addedProduct = await productModel.create({
            name: name,
            description: description,
            price: price,
        });
        res.status(200).json(addedProduct);
    } catch(error){
        res.status(500).json({error: error.message});
    }
}

// Get all the products to display them in the table
const getAllProducts = async(req, res) => {
    try{
        const products = await productModel.find();
        if(products.length === 0){
            return res.status(404).json({message: 'No products found'});
        }
        res.status(200).json(products);
    } catch(error){
        res.status(500).json({error: error.message});
    }
}

// Delete a product from the table
const deleteProduct = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({message: "Id is not valid!"});
    }
    try{
        const deletedProduct = await productModel.findByIdAndDelete(id);
        if(!deleteProduct){
            return res.status(404).json({message:"Not Found!"});
        }
        res.status(201).json({message: "Product deleted successfully"});
    } catch(error){
        res.status(400).json({error: error.message});
    }
}

//Update a product
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;

    try {
        const updatedProduct = await productModel.findOneAndUpdate(
            { _id: id },
            { name, description, price },
            { new: true } // to return the updated document
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found!" });
        }

        res.status(200).json({ message: "Product updated successfully.", updatedProduct });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}



module.exports = {
    addProduct,
    getAllProducts,
    deleteProduct,
    updateProduct
};