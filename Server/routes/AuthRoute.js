


const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const authController = require('../controllers/AuthController');
const { Account, accountValidationSchema } = require('../models/accountModel');
var session = require('express-session');



/*router.get('/login', auth, (req, res) => {
    res.send(req.user);
});*/

router.post('/login',authController.login);
router.post('/register',authController.register);
router.post('/logout',authController.logout);
// Route pour gérer le lien de confirmation d'e-mail
/*router.get('/register/:token', async (req, res) => {
    try {
        const account = await Account.findOne({ confirmationToken: req.params.token });
        console.log(account);
        if (account) {

            account.confirmed = true;
           // account.confirmationToken = undefined;
            await account.save();
    
            return res.send('Votre adresse e-mail a été confirmée avec succès');
            
        }

        return res.status(400).send('Le lien de confirmation est invalide');
    } catch (error) {
        res.status(500).send('Une erreur s\'est produite lors de la confirmation de votre adresse e-mail');
    }
});*/

// Route de confirmation
router.get('/register/:token', async (req, res) => {
    try {
        // Vérifier si le token correspond à celui dans la session
        console.log(req.session.user);
        //console.log(req.params.token);
        //console.log(req.session.account.confirmationToken);
        if (req.session.confirmationToken && req.params.token === req.session.account.confirmationToken) {
            // Créer le compte dans la base de données
            const account = new Account(req.session.account);
            await account.save();

            // Supprimer le compte de la session
            //delete req.session.account;

            return res.send('Votre adresse e-mail a été confirmée avec succès');
        }

        return res.status(400).send('Le lien de confirmation est invalide');
    } catch (error) {
        res.status(500).send('Une erreur s\'est produite lors de la confirmation de votre adresse e-mail');
    }
});

module.exports = router;
/*module.exports = router;*/