const { Shipping, shippingValidationSchema } = require('../models/shippingModel');

//CRUD

//CREATE:

// Create a shipping
const createShipping = async (req, res) => {
    try {
        // Validate the data
        const { error } = shippingValidationSchema.validate(req.body);

        if (error) return res.status(400).json({ error: error.details[0].message });
        // Save the shipping
        const shipping = new Shipping(req.body);
        await shipping.save();

        res.status(201).send(shipping);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//READ:

// Get a shipping by id
const getShippingById = async (req, res) => {
    const { id } = req.params;
    try {
        const shipping = await Shipping.findById(id);
        if (!shipping) {
            return res.status(404).json({ error: 'Shipping not found' });
        }
        res.status(200).send(shipping);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all shippings
const getAllShippings = async (req, res) => {
  try {
      const shippings = await Shipping.find();
      res.status(200).send(shippings);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

//UPDATE:

// Update a shipping by id
const updateShippingById = async (req, res) => {
  const { id } = req.params;
  try {
      const updatedShipping = await Shipping.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedShipping) {
          return res.status(404).json({ error: 'Shipping not found' });
      }
      res.status(200).send(updatedShipping);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};


//DELETE:

// Delete a shipping by id
const deleteShippingById = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedShipping = await Shipping.findByIdAndDelete(id);
        if (!deletedShipping) {
            return res.status(404).json({ error: 'Shipping not found' });
        }
        res.status(200).send(deletedShipping);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete all shippings
const deleteAllShippings = async (req, res) => {
    try {
        const result = await Shipping.deleteMany({});

        // Check if any documents were deleted
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'No shippings found to delete' });
        }

        res.status(200).json({ message: 'All shippings deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    createShipping,
    getAllShippings,
    getShippingById,
    deleteShippingById,
    deleteAllShippings,
    updateShippingById
};
