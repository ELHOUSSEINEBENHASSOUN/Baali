const { body, validationResult } = require('express-validator');

const accountValidator = [
    body('fullname').notEmpty().withMessage('Full name is required'),
    body('email').notEmpty().isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
    body('phoneNumber').notEmpty().withMessage('Phone number is required'),
    body('address').isArray().withMessage('Address must be an array'),
    // Uncomment the following lines if needed
    // body('isAdmin').isBoolean().withMessage('isAdmin must be a boolean'),
    // body('lastLogin').optional().isDate().withMessage('Invalid lastLogin date format'),
    // body('wishlist').optional().isArray().withMessage('Wishlist must be an array'),
    // body('resetPasswordToken').optional().isString().withMessage('Reset password token must be a string'),
    // body('resetPasswordExpires').optional().isDate().withMessage('Invalid resetPasswordExpires date format'),
    // body('Role').optional().isIn(['Admin', 'Manager', 'Customer']).withMessage('Invalid Role'),
    // body('isActive').optional().isBoolean().withMessage('isActive must be a boolean'),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        next();
    }
];

module.exports = {
    accountValidator
};