const { Account, accountValidationSchema } = require('../models/accountModel');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
var session = require('express-session')

const jwt = require('jsonwebtoken');
const { count } = require('console');



// Créer un transporteur de messagerie
/*let transporter = nodemailer.createTransport({
    service: 'smtp.yandex.ru',
    host: 'smtp.yandex.ru',
    auth: {
        user: 'mounir.baali@ya.ru',
        pass: 'shademan199206'
    }
});*/

let transporter = nodemailer.createTransport({
    service: 'gmail',
    //host: 'smtp.gmail.com',
    auth: {
       
        //type: "OAuth2",
        user: "mnrbaali@gmail.com",
        pass: "oxnxehselbsmwabu",
       /* clientId: '695313908186-5dalohai3j8ij6atbqgbkuo6as6n67u3.apps.googleusercontent.com',
        clientSecret: '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',
        /*refreshToken: 'votreRefreshToken'*/
        /*accessToken:"AIzaSyBIsgFMUnpCie7D3hROXuEQNdGRb4jZE4s"*/
    }

});

exports.login = async (req, res) => {
    const user = await Account.findOne({ email: req.body.email});
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        // Utilisateur authentifié avec succès
        // Générer un token JWT et l'envoyer à l'utilisateur

        const token = jwt.sign({ id: user._id }, 'JWT_SECRET', { expiresIn: '1h' });

        // Envoyer le token à l'utilisateur
        res.status(200).json({ token: token });
    } else {
        res.status(401).send('Nom d\'utilisateur ou mot de passe incorrect');
    }
};

/*exports.register = async (req, res) => {
    try {
        // Validate the data
        const { error } = accountValidationSchema.validate(req.body);

        if (error) return res.status(400).json({ error: error.details[0].message });
        
        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Générer un jeton unique pour l'utilisateur
        let token = crypto.randomBytes(64).toString('hex');

        // Save the account
        const account = new Account({
            ...req.body,
            password: hashedPassword,
            confirmationToken: token
        });
        await account.save();

        // Créer le lien de confirmation
        let confirmationLink = `http://localhost:3000/api/v1/auth/register/${token}`;

        // Créer le message de confirmation
        let mailOptions = {
            from: 'mnrbaali@gmail.com',
            to: req.body.email,
            subject: 'Confirmation d\'inscription',
            text: `Merci de vous être inscrit ! Veuillez confirmer votre adresse e-mail en cliquant sur le lien suivant : ${confirmationLink}`
        };

        // Envoyer l'e-mail de confirmation
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(500).send('Une erreur s\'est produite lors de l\'envoi de l\'e-mail de confirmation');
            } else {
                console.log('Email sent: ' + info.response);
                res.status(201).send('Un e-mail de confirmation a été envoyé à ' + req.body.email);
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};*/


exports.logout = (req, res) => {
    // Supprimer le cookie
    res.clearCookie('token');

    // Envoyer une réponse au client pour confirmer la déconnexion
    res.status(200).send('Déconnecté avec succès');
}; 

// Fonction d'envoi de mail
async function sendMail(account, res) {
    let mailOptions = {
        from: 'mnrbaali@gmail.com',
        to: account.email,
        subject: 'Confirmation d\'inscription',
        text: `Merci de vous être inscrit ! Veuillez confirmer votre adresse e-mail en cliquant sur le lien suivant : http://localhost:3000/api/v1/auth/register/${account.confirmationToken}`
    };

    // Envoyer l'e-mail de confirmation
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Une erreur s\'est produite lors de l\'envoi de l\'e-mail de confirmation');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(201).send('Un e-mail de confirmation a été envoyé à ' + account.email);
        }
    });
}

// Fonction d'enregistrement
exports.register = async (req, res) => {
    try {
        // Validate the data
        const { error } = accountValidationSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Générer un jeton unique pour l'utilisateur
        let token = crypto.randomBytes(64).toString('hex');

        // Créer l'objet compte
        const account = {
            ...req.body,
            password: hashedPassword,
            confirmationToken: token
        };

        // Stocker l'objet compte dans la session
        req.session.user = account;

        // Envoyer l'e-mail de confirmation
        await sendMail(account, res);
    } catch (error) {

         // Supprimer le compte de la session en cas d'erreur
         //delete req.session.account;
        res.status(500).json({ error: error.message });
    }
};

/*module.exports = {
    sendMail,
};*/
