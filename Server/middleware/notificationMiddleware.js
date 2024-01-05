// const Account = require('../models/accountModel')


// const authorizeNotification = (req, res, next) => {
//     const accountRole = req.account.role;
//     const Roles = ['Admin', 'Manager', 'Customer'];

//     // Vérifie si le rôle de l'utilisateur est autorisé
//     if (!Roles.includes(accountRole)) {
//         return res.status(403).json({ message: "You don't have permission to access this notification." });
//     }
//     next();
// };

const authorizeNotificationAccess = (req, res, next) => {
    const { role } = req.account;

    // Vérifiez si l'utilisateur a le rôle d'administrateur ou de manager
    if (role === 'Admin' || role === 'Manager') {
        next();
    } else {
        res.status(403).json({ message: 'Permission denied' });
    }
};
// isAdminMiddleware
const isAdmin = (req, res, next) => {
    const { isAdmin } = req.account;
    console.log('isAdmin :', isAdmin)

    if (isAdmin) {
        next();
    } else {
        res.status(403).json({ message: 'Permission denied. Admin access required.' });
    }
};

module.exports = {
    authorizeNotificationAccess,
    isAdmin
};