const { verifyToken } = require('../utils/jwt');

const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token || !token.startsWith("Bearer")){
            return res.status(401).json({ error: "Missing or invalid authentication data" });
            }
        const decoded = verifyToken(token.split(' ')[1]);
        req.account = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed' });
    }
};

module.exports = authenticate;