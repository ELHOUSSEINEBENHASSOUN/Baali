const express = require('express');
const router = express.Router();
const {
    createOffer,
    getAllOffers,
    getOfferById,
    updateOfferById,
    deleteOfferById
} = require('../controllers/offerController');

router.post('/', createOffer);
router.get('/', getAllOffers);
router.get('/:id', getOfferById);
router.put('/:id', updateOfferById);
router.delete('/:id', deleteOfferById);

module.exports = router;