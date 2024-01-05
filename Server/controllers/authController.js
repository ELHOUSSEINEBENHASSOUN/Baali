const bcrypt = require('bcrypt');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { Account } = require('../models/accountModel');
const { generateToken, verifyToken } = require('../utils/jwt');
const {sendEmail}= require('../middleware/authMiddleware')
require('dotenv').config();

// const sendEmail = async (to, subject, text) => {
//     try {
//     // Use Ethereal SMTP server details
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       host:"smtp.ethereal.email",
//       port: 587,
//       secure: false,
//       auth: {
//         user: process.env.USER,
//         pass: process.env.PASS,
//       },
//     });
    
//     // Email options
//     const mailOptions = {
//       from:{
//         name: 'DRESSING ROOM BAALI',
//         address: process.env.USER
//       },
//       to: 'a.jrhaidar@elbilia.ma',
//       subject: "Hello ✔",
//       text,
//     };
//     // Send the email
//     const info = await transporter.sendMail(mailOptions);

//     console.log('Message sent: %s', info.messageId);
//     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//   } catch (error) {
//     console.error('Error sending email:', error.message);
//   }
// }

const register = async (req, res) => {
    try {
        // Vérifier si l'utilisateur existe déjà avec la même adresse e-mail
        const existingUser = await Account.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        //hasher le mot de passe
        const hashedpassword = await bcrypt.hash(req.body.password, 10);
        // Générer un jeton unique pour l'utilisateur
        let token = crypto.randomBytes(64).toString('hex');
        let resetconfirmationTokenExpires = Date.now() + 3600000; // 1 heure
        // Créer l'objet compte
        const account = new Account({
            ...req.body,
            password: hashedpassword,
            isAdmin: false,
            confirmed: true,
            confirmationToken: token,
            resetPasswordExpires: resetconfirmationTokenExpires
        });
        // Sauvegarder le compte dans la base de données
        await account.save();
        // Créer le payload pour le token JWT
        const payload = {
        id: account.id,
        fullname: account.fullname,
        email: account.email,
        role: account.role
           };
           // Signer le payload avec le secret JWT
        const user = jwt.sign(payload, process.env.JWT_SECRET);
        // Stocker le token de confirmation dans la session
        req.session.tokenConfirmation = token;
        req.session.account= user;
        // Envoyer le message de confirmation par e-mail
        await sendEmail(req, res, next, account,'confirmation');
        res.status(201).json({ message: 'User created successfully', user: { _id: account._id, fullname: account.fullname } });

    } catch (error) {
        console.error('Error during registration: ', error.message)
        res.status(500).json({ message: 'Internal Server Error' });
        if (req.session) {
            delete req.session.tokenConfirmation;
        }
    }
};


const login = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(401).json({ message: 'Email or Password Invalid !' });
    }
    const account = await Account.findOne({ email: req.body.email });
    if (!account) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
    const isMatch = await bcrypt.compare(req.body.password, account.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
    const token = generateToken(account);

    res.cookie('authToken', token, { httpOnly: true });
    res.status(200).json({ token });
};
        // Générer un nouveau token après la modification du mot de passe        
        // const token = generateToken(account);
        //Définir le nouveau token dans le cookie
        // res.cookie('authToken', token, { httpOnly: true }).send({ message: 'Password changed successfully!' });

const changePassword = async (req, res) => {
    try {
        // Récupération des anciens et nouveaux mots de passe depuis le corps de la requête
        const { oldPassword, newPassword } = req.body;
        // Recherche du compte par son ID et récupération du mot de passe haché
        const account = await Account.findById(req.params.id).select('+password');
        const isValidOldPassowrd = await bcrypt.compare(oldPassword, account.password);
        if (!isValidOldPassowrd) {
            return res.status(400).json({ field: 'oldPassword', message: "Invalid Old Password" })
            } else {
                // Hachage du nouveau mot de passe et mise à jour du mot de passe dans la base de données
                account.password = await bcrypt.hash(newPassword, 10);
                await account.save();
                res.status(200).json({message: 'Password changed successfully'});
            };
    } catch (error) {
        console.log("Change password error : ", error);
        res.status(500).json({ message: 'Server Error' });
    }
};


// const resetPassword = async (req, res) => {
//     try {
//         const { email } = req.body;
//         const account = await Account.findOne({ email });

//         if (!account) {
//             return res.status(404).json({ message: "Account not found!" });
//         }

//         // Générer un token temporaire pour la réinitialisation
//         const resetToken = generateToken(account);

//         // Envoyer le lien de réinitialisation par mail
//         const url = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

//         // Envoyer le lien par email
//         sendEmail(email, url, `Bonjour,
//             Pour réinitialiser votre mot de passe, veuillez cliquer sur le lien ci-dessous :
//             ${url}
//             Merci!`);

//         res.status(200).json({ message: 'Email sent!' });
//     } catch (error) {
//         console.log("Reset password error: ", error);
//         throw new Error('Password reset failed');
//     }
// };

// const resetPassword = async (userId, newPassword)=> {
//     //Hash le nv password
//     const hashedNewPassword=await bcrypt.hash(newPassword, 10
//         );
//     // reset the new password
//     await Account.updateOne({_id: userId}, {password: hashedNewPassword, resetPasswordToken: undefined, resetPasswordExpires: undefined});
// };

const forgotPassword = async (req, res, next) => {
    try {
        // Récupération de l'e-mail depuis le corps de la requête
        const {to: email } = req.body;
        console.log('Email from Request',email);
        // Vérification si l'e-mail est présent dans la requête
        if (!email) {
            
            return res.status(400).json({ error: 'L\'e-mail est manquant dans la requête.' });
        }
        // Recherche du compte correspondant à cet e-mail
        const accountModel = await Account.findOne({ email });
        if (accountModel) {
        const token = crypto.randomBytes(64).toString('hex');
        const expirationTime = Date.now() + 3600000; // 1 heure
        // Sauvegarde du jeton et de l'heure d'expiration dans l'objet session
        req.session.resetToken= token;
        req.session.resetConfirmationToken = expirationTime;
        const recipientEmail = email;
        // Recherche du compte associé à l'e-mail dans la base de données
        await sendEmail(req, res, next, accountModel, 'reset-password', token, expirationTime, recipientEmail);
        res.status(200).send('Un e-mail a été envoyé à ' + accountModel.email + ' avec des instructions supplémentaires.');
        } 
        else {
            throw new Error('Aucun compte trouvé avec cet e-mail');
        };
    } catch (error) {
        next(error);
    }
};

const resetPassword = async (userId, newPassword) => {
    try {
        // Trouver l'utilisateur par son ID
        const user = await Account.findById(userId);

        console.log(user);
        if (!user) {
            throw new Error('Utilisateur introuvable');
        }

        // Mettre à jour le mot de passe de l'utilisateur
        user.password = newPassword;

        // Enregistrer les modifications dans la base de données
        await user.save();
    } catch (error) {
        throw new Error('Erreur lors de la réinitialisation du mot de passe');
    }
};

const resetPasswordRoute = async (req, res, next) => {
    try {
        // Recherche de l'utilisateur par son e-mail dans la base de données
        const user = await Account.findOne({ email: req.body.email });
        console.log('Token from URL:', req.params.token);
        // Vérification si l'utilisateur existe
        if (!user) {
            throw new Error('Aucun compte trouvé avec cet e-mail');
        }
        // Vérification si le token de la session correspond au token de la requête
        if (req.session.resetToken !== req.params.token) {
            throw new Error('Token de réinitialisation du mot de passe invalide');
        }
        // Vérification si le token a expiré
        if (Number(req.session.resetConfirmationToken) < Date.now()) {
            throw new Error('Token de réinitialisation du mot de passe expiré');
        }
        // Vérification si un nouveau mot de passe a été fourni
        if (!req.body.password) {
            throw new Error('Aucun nouveau mot de passe fourni');
        }
        // Appel à la fonction resetPassword pour mettre à jour le mot de passe de l'utilisateur
        await resetPassword(user._id, req.body.password);

        res.send('Votre mot de passe a été réinitialisé avec succès');
    } catch (error) {
        next(error);
    }
};
const logout = (req, res) => {
    // Clear the 'authToken' cookie
    res.clearCookie('authToken');
    res.status(200).json({ message: 'Logout successful' });
};


module.exports = {
    login,
    register,
    forgotPassword,
    resetPasswordRoute,
    changePassword,
    logout
};



// register
// Logout
// Login
// Change Password
// ResetPassword 