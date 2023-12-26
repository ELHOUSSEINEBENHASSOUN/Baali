const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).send('Accès refusé. Aucun en-tête d\'autorisation fourni.');
    
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).send('Accès refusé. Aucun token fourni.');

    try {
        const decoded = jwt.verify(token, 'JWT_SECRET');
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Token invalide.');
    }
};