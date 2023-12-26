const { Account, accountValidationSchema } = require('../models/accountModel');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const user = await Account.findOne({ email: req.body.email});
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        // Utilisateur authentifié avec succès
        // Générer un token JWT et l'envoyer à l'utilisateur

        const token = jwt.sign({ id: user._id }, 'JWT_SECRET', { expiresIn: '1h' });

        // Envoyer le token à l'utilisateur
        res.status(200).json({ token: token });
    } else {
        res.status(401).send('Nom d\'utilisateur ou mot de passe incorrect');
    }
};