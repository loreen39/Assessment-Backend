const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerMiddleware');

const { addProduct, getAllProducts, deleteProduct, updateProduct } = require('../Controllers/productController');

router.post("/product",  upload.single('image'),addProduct);
router.get("/product",getAllProducts);
router.delete("/product/:id", deleteProduct);
router.put("/product/:id", updateProduct);

module.exports = router;