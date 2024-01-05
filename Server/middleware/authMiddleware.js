const { verifyToken } = require('../utils/jwt');
const nodemailer = require('nodemailer');
const rateLimit =require('express-rate-limit');

const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token || !token.startsWith("Bearer")){
            return res.status(401).json({ error: "Missing or invalid authentication data" });
            }
        const decoded = verifyToken(token.split(' ')[1]);
        req.account = decoded;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        if (error.message === 'Token expired') {
            res.status(401).json({ message: 'Token expired' });
        } else {
        res.status(401).json({ message: 'Authentication failed' });
        }
    };
};

const sendEmail = async (req, res, next, accountModel, type, token, expiration, recipientEmail) => {
    try {
        let mailOptions;
        switch (type) {
            case 'confirmation':
                mailOptions = {
                    from: {
                        name: 'DRESSING ROOM BAALI',
                        address: process.env.USER
                    },
                    to: recipientEmail,  // Utiliser recipientEmail ici
                    subject: 'Confirmation d\'inscription',
                    text: `Merci de vous être inscrit ! Veuillez confirmer votre adresse e-mail en cliquant sur le lien suivant : http://localhost:3000/api/v1/auth/register/${req.body.confirmationToken}`
                };
                break;
            case 'reset-password':
                mailOptions = {
                    from: {
                        name: 'DRESSING ROOM BAALI',
                        address: process.env.USER
                    },
                    to: recipientEmail,
                    subject: 'Réinitialisation du mot de passe',
                    text: `Vous recevez ceci parce que vous (ou quelqu'un d'autre) avez demandé la réinitialisation du mot de passe de votre compte.\n\n` +
                        `Veuillez cliquer sur le lien suivant, ou copiez et collez-le dans votre navigateur pour terminer le processus :\n\n` +
                        `http://localhost:3000/api/v1/auth/reset/${token}\n\n` +  // Utiliser token ici
                        `Ce lien expirera à ${new Date(expiration).toLocaleString()}.\n\n` +
                        `Si vous n'avez pas demandé cela, veuillez ignorer cet e-mail et votre mot de passe restera inchangé.\n`
                };
                break;
            default:
                throw new Error('Type d\'e-mail non pris en charge');
        }
        // Envoyer l'e-mail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.status(201).send(`Un e-mail a été envoyé à ${recipientEmail}`);  // Utiliser recipientEmail ici
        next();
    } catch (error) {
        next(error);
    }
};

const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, //1h
    max: 100, // nombre de requêtes autorisées dans la fenêtre
    message: "Trop de requêtes depuis cette adresse IP. Veuillez réessayer après une heure.",
});



module.exports = {
    authenticate,
    limiter,
    sendEmail};