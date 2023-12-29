const express = require('express');
const router = express.Router();

const { createOrder, getAllOrders, getOrderById, deleteOrderById, deleteAllOrders, updateOrderById } = require('../controllers/orderController');

// Routes
router.post('/addOrder', createOrder);
router.get('/getAllOrders', getAllOrders);
router.get('/getOrder/:id', getOrderById);
router.delete('/delOrder/:id', deleteOrderById);
router.delete('/delAllOrders', deleteAllOrders);
router.put('/updateOrder/:id', updateOrderById);

module.exports = router;
