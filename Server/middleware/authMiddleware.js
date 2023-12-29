const { verifyToken } = require('../utils/jwt');

const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = verifyToken(token);
        req.account = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed' });
    }
};

const isAdmin = (req, res, next) => {
    if (req.account && req.account.role === 'Admin') {
        return next();
    }
    return res.status(403).json({ message: 'Access denied: Admin privileges required.' });
};

const isManager = (req, res, next) => {
    if (req.account && req.account.role === 'Manager') {
        return next();
    }
    return res.status(403).json({ message: 'Access denied: Manger privileges required.' });
};

module.exports = {
    authenticate,
    isAdmin,
    isManager
};
