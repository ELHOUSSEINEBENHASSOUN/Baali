//Create
const Shipping = require('./models/shippingModel');

async function createShipping(shippingData) {
  try {
    const newShipping = await Shipping.create(shippingData);
    console.log('Shipping created successfully:', newShipping);
    return newShipping;
  } catch (error) {
    console.error('Error creating shipping:', error.message);
    throw error;
  }
}

//Read
async function getAllShipping() {
    try {
      const allShipping = await Shipping.find();
      console.log('All shipping retrieved successfully:', allShipping);
      return allShipping;
    } catch (error) {
      console.error('Error retrieving shipping:', error.message);
      throw error;
    }
  }
  
  async function getShippingById(shippingId) {
    try {
      const shipping = await Shipping.findById(shippingId);
      if (!shipping) {
        console.log('Shipping not found');
        return null;
      }
      console.log('Shipping retrieved successfully:', shipping);
      return shipping;
    } catch (error) {
      console.error('Error retrieving shipping:', error.message);
      throw error;
    }
  }

  //Update
  async function updateShipping(shippingId, updatedShippingData) {
    try {
      const updatedShipping = await Shipping.findByIdAndUpdate(shippingId, updatedShippingData, { new: true });
      if (!updatedShipping) {
        console.log('Shipping not found');
        return null;
      }
      console.log('Shipping updated successfully:', updatedShipping);
      return updatedShipping;
    } catch (error) {
      console.error('Error updating shipping:', error.message);
      throw error;
    }
  }

  //Delete
  async function deleteShipping(shippingId) {
    try {
      const deletedShipping = await Shipping.findByIdAndRemove(shippingId);
      if (!deletedShipping) {
        console.log('Shipping not found');
        return null;
      }
      console.log('Shipping deleted successfully:', deletedShipping);
      return deletedShipping;
    } catch (error) {
      console.error('Error deleting shipping:', error.message);
      throw error;
    }
  }
  