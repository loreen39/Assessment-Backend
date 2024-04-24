const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerMiddleware');

const { addProduct } = require('../Controllers/productController');

router.post("/product", addProduct);

module.exports = router;