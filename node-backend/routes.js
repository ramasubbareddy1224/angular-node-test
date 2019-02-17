const express = require('express');
const router = express.Router();
const userCtrl = require('./controller/user.controller');

router.get('/search/:searchText', userCtrl.search);

module.exports = router;