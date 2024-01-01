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

//fonction login
exports.login = async (req, res, next) => {
    try {
        const user = await Account.findOne({ email: req.body.email});
        if (user && await bcrypt.compare(req.body.password, user.password)) {
            // Utilisateur authentifié avec succès
            // Générer un token JWT et l'envoyer à l'utilisateur

            const token = jwt.sign({ id: user._id }, 'JWT_SECRET', { expiresIn: '1h' });

            // Envoyer le token à l'utilisateur
            res.status(200).json({ token: token });
        } else {
            throw new Error('Erreur d\'authentification');
        }
    } catch (error) {
        next(error); // Passez l'erreur au prochain middleware
    }
};

/*exports.login = async (req, res) => {
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
*/
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

exports.sendMail = async (account,type, token, resetconfirmationTokenExpires,res, next) => {
   
    try {
        let mailOptions;

        switch (type) {
            case 'confirmation':
                mailOptions = {
                    from: 'mnrbaali@gmail.com',
                    to: account.email,
                    subject: 'Confirmation d\'inscription',
                    text: `Merci de vous être inscrit ! Veuillez confirmer votre adresse e-mail en cliquant sur le lien suivant : http://localhost:3000/api/v1/auth/register/${account.confirmationToken}`
                };
                break;

                case 'reset-password':
                    mailOptions = {
                        from: 'mnrbaali@gmail.com',
                        to: account.email,
                        subject: 'Réinitialisation du mot de passe',
                        text: `Vous recevez ceci parce que vous (ou quelqu'un d'autre) avez demandé la réinitialisation du mot de passe de votre compte.\n\n` +
                              `Veuillez cliquer sur le lien suivant, ou copiez et collez-le dans votre navigateur pour terminer le processus :\n\n` +
                              `http://localhost:3000/reset/${token}\n\n` +
                              `Ce lien expirera à ${new Date(resetconfirmationTokenExpires).toLocaleString()}.\n\n` +
                              `Si vous n'avez pas demandé cela, veuillez ignorer cet e-mail et votre mot de passe restera inchangé.\n`
                    };
                    break;
            /*case 'reset-password':
                mailOptions = {
                    from: 'mnrbaali@gmail.com',
                    to: account.email,
                    subject: 'Réinitialisation du mot de passe',
                    text: `Vous recevez ceci parce que vous (ou quelqu'un d'autre) avez demandé la réinitialisation du mot de passe de votre compte.\n\n` +
                          `Veuillez cliquer sur le lien suivant, ou copiez et collez-le dans votre navigateur pour terminer le processus :\n\n` +
                          `http://localhost:3000/reset/${account.confirmationToken}\n\n` +
                          `Si vous n'avez pas demandé cela, veuillez ignorer cet e-mail et votre mot de passe restera inchangé.\n`
                };
                break;*/
            // Ajoutez autant de cas que vous le souhaitez...
        }

        // Envoyer l'e-mail
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                throw new Error('Erreur d\'envoi de mail');
            } else {
                console.log('Email sent: ' + info.response);
                res.status(201).send('Un e-mail a été envoyé à ' + account.email);
            }
        });
    } catch (error) {
        next(error); // Passez l'erreur au prochain middleware
    }
};
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
    /* try {
        let mailOptions = {
            from: 'mnrbaali@gmail.com',
            to: account.email,
            subject: 'Confirmation d\'inscription',
            text: `Merci de vous être inscrit ! Veuillez confirmer votre adresse e-mail en cliquant sur le lien suivant : http://localhost:3000/api/v1/auth/register/${account.confirmationToken}`
        };

        // Envoyer l'e-mail de confirmation
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                throw new Error('Erreur d\'envoi de mail');
            } else {
                console.log('Email sent: ' + info.response);
                res.status(201).send('Un e-mail de confirmation a été envoyé à ' + account.email);
            }
        });
    } catch (error) {
        next(error); // Passez l'erreur au prochain middleware
    }
};*/

/*exports.sendMail = async (account, res) =>{
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
*/









// Fonction d'enregistrement
exports.register = async (req, res , next) => {
    try {
        // Validate the data
        const { error } = accountValidationSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Générer un jeton unique pour l'utilisateur
        let token = crypto.randomBytes(64).toString('hex');
        let resetconfirmationTokenExpires = Date.now() + 3600000; // 1 heure
        // Créer l'objet compte
        const account = {
            ...req.body,
            password: hashedPassword,
            confirmationToken: token,
            resetPasswordExpires :resetconfirmationTokenExpires
        };
        const utilisateur = jwt.sign(account, 'JWT_SECRETt');
        // Stocker le token de confirmation dans la session
        req.session.account = utilisateur;
        req.session.confirmationToken = token;
         console.log(req.session.confirmationToken);
        // Envoyer l'e-mail de confirmation
        await exports.sendMail(account,'confirmation', res);
    } catch (error) {
        // Supprimer le token de confirmation de la session en cas d'erreur
        delete req.session.confirmationToken;
        next(error); // Passez l'erreur au prochain middleware
        //res.status(500).json({ error: error.message });
    }
};


// Votre fonction CRUD pour réinitialiser le mot de passe
exports.resetPassword = async (userId, newPassword) => {
    // Hash le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Mettez à jour le mot de passe de l'utilisateur et supprimez le token de réinitialisation du mot de passe
    await Account.updateOne({ _id: userId }, { password: hashedPassword, resetPasswordToken: undefined, resetPasswordExpires: undefined });
};

/*module.exports = {
    sendMail: sendMail
};*/
