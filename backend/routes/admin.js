const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/', adminController.getIndex);

router.get('/add-series', adminController.getAddSeries);

router.get('/edit-series/:seriesId', adminController.getEditseries);

router.post('/add-series', adminController.postSeries);

router.post('/edit-series', adminController.postEditSeries);

router.get('/:seriesId', adminController.getSeries);

router.post('/delete', adminController.postDelete);

module.exports = router;