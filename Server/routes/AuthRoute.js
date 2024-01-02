
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

var session = require('express-session')
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const limiter = require('../middleware/limitationTaux');
const authController= require('../controllers/AuthController');
const {sendMail, login, register, logout, resetPassword} = require('../controllers/AuthController')
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

router.post('/login',limiter, login);
router.post('/register',limiter, register);
router.post('/logout', logout);
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
router.get('/register/:token',limiter, async (req, res, next) => {
    try {
        // Vérifier si le token correspond à celui dans la session
        //console.log(req.params.token);
        console.log(req.session.confirmationToken);
        console.log(req.session.account);
        if (req.session.confirmationToken && req.params.token === req.session.confirmationToken) {

             // Déchiffrer le JWT pour obtenir les informations du compte
             const accountModel = jwt.verify(req.session.account, process.env.JWT_SECRET);
            // Créer le compte dans la base de données
            const account = new Account(accountModel);
            await account.save();

            // Supprimer le token de confirmation de la session
           delete req.session.confirmationToken;

            return res.send('Votre adresse e-mail a été confirmée avec succès');
        }

        throw new Error('Le lien de confirmation est invalide');
    } catch (error) {
        next(error); // Passez l'erreur au prochain middleware
    }
});
/*
        return res.status(400).send('Le lien de confirmation est invalide');
    } catch (error) {
        res.status(500).send('Une erreur s\'est produite lors de la confirmation de votre adresse e-mail : ' + error.message);
    }
});*/


// Ajoutez cette route dans votre fichier authRoute
router.get('/resend-confirmation',limiter, async (req, res, next) => {
    try {
        // Vérifiez si le compte existe dans la session
        if (req.session && req.session.account) {

            const accountModel = jwt.verify(req.session.account, process.env.JWT_SECRET);
            // Renvoyer l'e-mail de confirmation
            await sendMail(req,res,next,accountModel,'confirmation');
        } else  {
            throw new Error('Aucun compte trouvé dans la session');
        }
    } catch (error) {
        next(error); // Passez l'erreur au prochain middleware
    }
});/*{

            
            return res.status(400).send('Aucun compte trouvé dans la session');
        }
    } catch (error) {
        res.status(500).send('Une erreur s\'est produite lors de la réexpédition de l\'e-mail de confirmation : ' + error.message);
    }
});*/

router.post('/forgot-password', limiter, async (req, res, next) => {
    try {
        // Trouvez l'utilisateur par son e-mail
        const accountModel = await Account.findOne({ email: req.body.email });
        if (accountModel) {

            let token = crypto.randomBytes(64).toString('hex');
            let resetconfirmationTokenExpires = Date.now() + 3600000; // 1 heure
            req.session.resetToken = token;
            req.session.resetconfirmationTokenExpire =resetconfirmationTokenExpires;
            await sendMail(req,res,next, accountModel, 'reset-password',token, resetconfirmationTokenExpires);
        res.status(200).send('Un e-mail a été envoyé à ' + accountModel.email + ' avec des instructions supplémentaires.');
        }else {

        throw new Error('Aucun compte trouvé avec cet e-mail');
    } 
    
    } catch (error) {
        next(error); // Passez l'erreur au prochain middleware
    }

        })


 // Votre fonction de gestion de route pour réinitialiser le mot de passe
 router.post('/reset/:token', limiter, async (req, res, next) => {
    try {
        // Trouvez l'utilisateur par son e-mail
        const user = await Account.findOne({ email: req.body.email });
        if (!user) {
            throw new Error('Aucun compte trouvé avec cet e-mail');
        }

        // Vérifiez si le token de la session correspond au token de la requête
        if (req.session.resetToken !== req.params.token) {
            throw new Error('Token de réinitialisation du mot de passe invalide');
        }

        // Vérifiez si le token a expiré
        if (req.session.resetconfirmationTokenExpire < Date.now()) {
            throw new Error('Token de réinitialisation du mot de passe expiré');
        }

        // Vérifiez si un nouveau mot de passe a été fourni
        if (!req.body.password) {
            throw new Error('Aucun nouveau mot de passe fourni');
        }

        // Réinitialisez le mot de passe de l'utilisateur
        await resetPassword(user._id, req.body.password);

        res.send('Votre mot de passe a été réinitialisé avec succès');
    } catch (error) {
        next(error); // Passez l'erreur au prochain middleware
    }
});
module.exports = router;
/*module.exports = router;*/