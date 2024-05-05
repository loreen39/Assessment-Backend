const express = require('express');
const router = express.Router();
const validateToken = require('../middlewares/validateTokenHandler');

const { addProduct, getAllProducts, deleteProduct, updateProduct } = require('../Controllers/productController');

router.post("/" ,addProduct);
router.get("/", validateToken, getAllProducts);
router.delete("/:id", deleteProduct);
router.put("/:id" ,updateProduct);

module.exports = router;