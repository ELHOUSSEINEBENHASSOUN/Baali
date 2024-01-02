const rateLimit = require('express-rate-limit');



// Créez une instance de rateLimit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limite chaque IP à 100 requêtes par windowMs
});

// Exportez le middleware
module.exports = limiter;