


const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const authController = require('../controllers/AuthController');




/*router.get('/login', auth, (req, res) => {
    res.send(req.user);
});*/

router.post('/login',authController.login);

module.exports = router;