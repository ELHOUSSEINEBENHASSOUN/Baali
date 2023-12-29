const { Order, orderValidationSchema } = require('../models/orderModel');

// CREATE
const createOrder = async (req, res) => {
    try {
        // Validate the data
        const { error } = orderValidationSchema.validate(req.body);

        if (error) return res.status(400).json({ error: error.details[0].message });

        // Save the order
        const order = new Order(req.body);
        await order.save();

        res.status(201).send(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// READ
const getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).send(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).send(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// UPDATE
const updateOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).send(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE
const deleteOrderById = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedOrder = await Order.findByIdAndDelete(id);
        if (!deletedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).send(deletedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteAllOrders = async (req, res) => {
    try {
        const result = await Order.deleteMany({});

        // Check if any documents were deleted
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'No orders found to delete' });
        }

        res.status(200).json({ message: 'All orders deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    deleteOrderById,
    deleteAllOrders,
    updateOrderById
};
