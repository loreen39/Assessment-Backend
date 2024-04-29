const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerMiddleware');
const ifHaveToken = require('../middlewares/tokenExist');

const { addProduct, getAllProducts, deleteProduct, updateProduct } = require('../Controllers/productController');

router.post("/product", ifHaveToken, upload.single('image'),addProduct);
router.get("/product", ifHaveToken, getAllProducts);
router.delete("/product/:id", deleteProduct);
router.put("/product/:id", updateProduct);

module.exports = router;