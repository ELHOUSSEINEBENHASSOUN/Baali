var GoogleStrategy = require('passport-google-oauth2').Strategy;
//const passport = require("passport");
const { Account } = require('../models/accountModel');
const findOrCreate = require('mongoose-findorcreate');
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const app = express();
app.use(session({
    secret: 'your-session-secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: "695313908186-5dalohai3j8ij6atbqgbkuo6as6n67u3.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/api/v2/auth/google/callback",
    passReqToCallback: true
}, function(request, accessToken, refreshToken, profile, done) {
    Account.findOrCreate({ googleId: profile.id }, function(err, user) {
        return done(err, user);
    });
}));

passport.serializeUser((account, done) => {
    done(null, account._id);
});

passport.deserializeUser(async (id, done) => {
    const user = await Account.findById(id);
    if (user) {
        done(null, user);
    } else {
        done(new Error('User not found'));
    }
});

module.exports = passport;