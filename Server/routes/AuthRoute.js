
const jwt = require('jsonwebtoken');

const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const authController= require('../controllers/AuthController');
//const sendMail } = require('../controllers/AuthController');
const { Account, accountValidationSchema } = require('../models/accountModel');
/*var session = require('express-session');
const app = express();
app.use(session({
    secret: 'your_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));*/

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
        //console.log(req.params.token);
        console.log(req.session.confirmationToken);
        console.log(req.session.account);
        if (req.session.confirmationToken && req.params.token === req.session.confirmationToken) {

             // Déchiffrer le JWT pour obtenir les informations du compte
             const accountModel = jwt.verify(req.session.account, 'JWT_SECRETt');
            // Créer le compte dans la base de données
            const account = new Account(accountModel);
            await account.save();

            // Supprimer le token de confirmation de la session
           delete req.session.confirmationToken;

            return res.send('Votre adresse e-mail a été confirmée avec succès');
        }

        return res.status(400).send('Le lien de confirmation est invalide');
    } catch (error) {
        res.status(500).send('Une erreur s\'est produite lors de la confirmation de votre adresse e-mail : ' + error.message);
    }
});


// Ajoutez cette route dans votre fichier authRoute
router.get('/resend-confirmation', async (req, res) => {
    try {
        // Vérifiez si le compte existe dans la session
        if (req.session && req.session.account) {

            const accountModel = jwt.verify(req.session.account, 'JWT_SECRETt');
            // Renvoyer l'e-mail de confirmation
            await authController.sendMail(accountModel, res);
        } else {
            return res.status(400).send('Aucun compte trouvé dans la session');
        }
    } catch (error) {
        res.status(500).send('Une erreur s\'est produite lors de la réexpédition de l\'e-mail de confirmation : ' + error.message);
    }
});

module.exports = router;
/*module.exports = router;*/