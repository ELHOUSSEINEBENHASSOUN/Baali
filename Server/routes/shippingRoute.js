const express = require('express');
const router = express.Router();

const { createShipping, getAllShippings, getShippingById, deleteShippingById, deleteAllShippings, updateShippingById } = require('../controllers/shippingController');

// Routes
router.post('/addShipping', createShipping);
router.get('/getAllShippings', getAllShippings);
router.get('/getShipping/:id', getShippingById);

router.delete('/delShipping/:id', deleteShippingById);
router.delete('/delAllShippings', deleteAllShippings);

router.put('/updateShipping/:id', updateShippingById);

module.exports = router;
