const express = require('express');
const router = express.Router();
const ifHaveToken = require('../middlewares/tokenExist');

const {loginUser, logout} = require('../Controllers/accountController');

router.put('/login', ifHaveToken , loginUser);
router.post('/logout' , logout);

module.exports = router;