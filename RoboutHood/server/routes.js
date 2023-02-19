import express from 'express';
var router = express.Router();

import * as helpers from './database/helpers.js';
// const router = require('express').Router();
// const helpers = require('./database/helpers.js');

router.get('/', helpers.getAllStocks);
router.post('/add', helpers.addStock);

export default router;
// module.exports = router;