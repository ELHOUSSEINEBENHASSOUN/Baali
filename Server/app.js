const express = require('express');
const morgan = require('morgan');
const joi = require('joi');
const helmet = require('helmet');
const dotenv = require('dotenv');
require('./config/database');
var session = require('express-session')




dotenv.config({ path: '.env' });



const app = express();
app.use(session({
    secret: 'your_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));

// Middlewares de ExpressJS
app.use(express.urlencoded({ extended: true })); // send data with Form URLencoded
app.use(express.json()); // send data with JSON
// app.use(express.static('public')); // Access to the file static
app.use(helmet()); // To Secure requestes HTTP
app.use(morgan('tiny')); // Status of the requestes HTTP and 'tiny' responsable for format msg
//app.use(session({ secret: 'keyboardcat', resave: true, saveUninitialized: true, cookie: { maxAge: 60000 }}));

//Routes
// app.use('/api/v1/account', accountRoute)+const accountRoute = require('./routes/accountRoute');

// app.use('/api/v1/account', require('./routes/accountRoute'));
app.use('/api/v1/account', require('./routes/accountRoute'));
app.use('/api/v1/category', require('./routes/categoryRoute'));
app.use('/api/v1/offer', require('./routes/offerRoute'));
app.use('/api/v1/notification', require('./routes/notificationRoute'));
app.use('/api/v1/auth', require('./routes/AuthRoute'));

app.use((err, req, res, next) => {
  console.error(err.stack); // Log l'erreur dans la console

  // Vous pouvez utiliser un switch case pour gérer différentes erreurs
  switch (err.message) {
      case 'Erreur de validation':
          res.status(400).send('Les données fournies sont invalides');
          break;
      case 'Erreur d\'envoi de mail':
          res.status(500).send('Une erreur s\'est produite lors de l\'envoi de l\'e-mail de confirmation');
          break;
      case 'Erreur d\'authentification':
          res.status(401).send('Nom d\'utilisateur ou mot de passe incorrect//');
          break;
      case 'Le lien de confirmation est invalide':
            res.status(400).send('Le lien de confirmation est invalide');
            break;
      case 'Aucun compte trouvé dans la session':
            res.status(400).send('Aucun compte trouvé dans la session');
            break;    
      case 'Aucun compte trouvé avec cet e-mail':
            res.status(400).send('Aucun compte trouvé merci de verifier votre adrese mail et ressyez à nouveau');
            break;
            case 'Token de réinitialisation du mot de passe invalide':
            res.status(400).send('Token de réinitialisation du mot de passe invalide');
            break;      
      case 'Token de réinitialisation du mot de passe expiré':
            res.status(400).send('Token de réinitialisation du mot de passe expiré');
            break;      
      case 'Aucun nouveau mot de passe fourni':
            res.status(400).send('Aucun nouveau mot de passe fourni');
            break;      
      /*case 'Aucun compte trouvé avec cet e-mail':
            res.status(400).send('Aucun compte trouvé merci de verifier votre adrese mail et ressyez à nouveau');
            break;                     */
      default:
          res.status(500).send('Une erreur inconnue s\'est produite');
  }
});
// app.use('/api/v1/transaction', require('./routes/transactionRoute'));



const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
