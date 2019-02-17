const express = require('express');
const router = express.Router();
const userCtrl = require('../controller/user.controller');

router.get('/search/:searchText', userCtrl.search);
router.post('/create',userCtrl.create);
router.get('/',userCtrl.all);

module.exports = router;