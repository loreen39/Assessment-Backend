const productModel = require('../Models/product');
const validator = require('validator');
const {default:mongoose} = require('mongoose');
const fs = require("fs").promises;

const addProduct = async (req, res) => {
    const {name, description, price} = req.body;

    if(validator.isEmpty(name) || validator.isEmpty(description) || validator.isEmpty(price)){
      /*  if(req.file) {
            await fs.unlink(oldImagePath);
        }*/
        return res.status(400).json({error: "All Fields are required!"});
    }

    try{
        const addedProduct = await productModel.create({
            name: name,
            description: description,
            price: price,
        });
        res.status(200).json({message: 'Product added successfully.', product: addedProduct});
    } catch(error){
        res.status(500).json({error: error.message});
    }
}



module.exports = {
    addProduct,
};