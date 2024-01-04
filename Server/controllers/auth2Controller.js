var GoogleStrategy = require('passport-google-oauth2').Strategy;
//const passport = require("passport");
const { Account } = require('../models/accountModel');
const findOrCreate = require('mongoose-findorcreate');
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const app = express();
/*app.use(session({
    secret: 'your-session-secret',
    resave: false,
    saveUninitialized: false
}));*/

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    callbackURL: "http://localhost:3000/api/v2/auth/google/callback",
    //passReqToCallback: true,
    //accessType: 'offline', 
   // passReqToCallback: true
}, 

async ( accessToken, refreshToken, profile, done) => {
    try {
      // Check if the user already exists in your database
      //console.log(profile);
      /*request.session.accessToken = accessToken;*/

      const user = await Account.findOne({googleId:profile.id});
    
      if (user) {

        user.accessToken = accessToken;
        user.refreshToken = refreshToken;
        //user.accessToken=accessToken
        await user.save();
        return done(null, user);
      } else {

        // User does not exist, create a new user
        const newUser = await Account.create( {
          email: profile.emails[0].value,
          fullname: profile.displayName,
          googleId: profile.id,
          lastLogin: new Date(),
          accessToken,
          refreshToken
          
        });

        if (newUser) {
          
         // newUser.accessToken=accessToken
          return done(null, newUser);
        } else {
          // Error creating user
          return done(null, false, { message: "Error creating user." });
        }
      }
    } catch (error) {
      // Handle errors
      console.error(error);
      return done(error, false, {
        message: "Error processing Google authentication.",
      });
    }
  }
)
);







/*function(request, accessToken, refreshToken, profile, done) {
    // Account.findOrCreate({ googleId: profile.id }, function(err, user) {
    //     console.log(profile);
    //     console.log(user);
    //     return done(err, user);
    // });
    console.log(profile);
}));*/

passport.serializeUser((account, done) => {
    console.log("haha", account)
    done(null, account.id);
});

passport.deserializeUser(async (id, done) => {
    console.log("hoho", id)
    const user = await Account.findById(id);
    if (user) {
        done(null, user);
    } else {
        done(new Error('User not found'));
    }
});

module.exports = passport;