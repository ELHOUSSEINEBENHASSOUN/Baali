//Create
const Order = require('./models/orderModel');

async function createOrder(orderData) {
  try {
    const newOrder = await Order.create(orderData);
    console.log('Order created successfully:', newOrder);
    return newOrder;
  } catch (error) {
    console.error('Error creating order:', error.message);
    throw error;
  }
}

//Read
async function getAllOrders() {
    try {
      const allOrders = await Order.find();
      console.log('All orders retrieved successfully:', allOrders);
      return allOrders;
    } catch (error) {
      console.error('Error retrieving orders:', error.message);
      throw error;
    }
  }
  
  async function getOrderById(orderId) {
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        console.log('Order not found');
        return null;
      }
      console.log('Order retrieved successfully:', order);
      return order;
    } catch (error) {
      console.error('Error retrieving order:', error.message);
      throw error;
    }
  }
  
//Update
async function updateOrder(orderId, updatedOrderData) {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(orderId, updatedOrderData, { new: true });
      if (!updatedOrder) {
        console.log('Order not found');
        return null;
      }
      console.log('Order updated successfully:', updatedOrder);
      return updatedOrder;
    } catch (error) {
      console.error('Error updating order:', error.message);
      throw error;
    }
  }
  
//Delete
async function deleteOrder(orderId) {
    try {
      const deletedOrder = await Order.findByIdAndRemove(orderId);
      if (!deletedOrder) {
        console.log('Order not found');
        return null;
      }
      console.log('Order deleted successfully:', deletedOrder);
      return deletedOrder;
    } catch (error) {
      console.error('Error deleting order:', error.message);
      throw error;
    }
  }
  