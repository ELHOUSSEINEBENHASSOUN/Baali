const { Offer, offerValidationSchema } = require('../models/offerModel');

// Create
const createOffer = async (req, res) => {
    const { error } = offerValidationSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let offer = new Offer(req.body);
    offer = await offer.save();

    res.send(offer);
};

// Read
const getAllOffers = async (req, res) => {
    const offers = await Offer.find();
    res.send(offers);
};

const getOfferById = async (req, res) => {
    const offer = await Offer.findById(req.params.id);
    if (!offer) return res.status(404).send('The offer with the given ID was not found.');

    res.send(offer);
};

// Update
const updateOfferById = async (req, res) => {
    const { error } = offerValidationSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!offer) return res.status(404).send('The offer with the given ID was not found.');

    res.send(offer);
};

// Delete
const deleteOfferById = async (req, res) => {
    const offer = await Offer.findByIdAndRemove(req.params.id);
    if (!offer) return res.status(404).send('The offer with the given ID was not found.');

    res.send(offer);
};

module.exports = {
    createOffer,
    getAllOffers,
    getOfferById,
    updateOfferById,
    deleteOfferById
};