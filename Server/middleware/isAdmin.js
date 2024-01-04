const isAdmin = (req, res, next) => {
    //console.log(req.user);
    if (req.user && req.user.isAdmin === true) {
        return next();
    }
    return res.status(403).json({ message: 'Access denied: Admin privileges required.' });
};

module.exports = isAdmin;