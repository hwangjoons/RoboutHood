import express from 'express';
var router = express.Router();

import * as helpers from './database/helpers.js';
// const router = require('express').Router();
// const helpers = require('./database/helpers.js');

router.get('/', helpers.getAllAdvice);
router.get('/getone', helpers.getOne);
router.get('/getallfavorites', helpers.getAllFavorites);
router.post('/add', helpers.addAdvice);
router.put('/favorite', helpers.favoriteAdvice);
router.delete('/:id', helpers.deleteAdvice);
export default router;
// module.exports = router;