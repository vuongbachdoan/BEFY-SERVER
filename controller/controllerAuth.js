const express = require('express')
require('dotenv').config()
const User = require('../model/modelUser')
const passport = require('passport')

passport.serializeUser((user, done) => {
    return done(null, user)
})

passport.deserializeUser((req, user, done) => {
    req.session.user = user
    return done(null, user)
});

const GoogleStrategy = require('passport-google-oidc')
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL
        },
        function verify(_, profile, cb) {
            if (profile.id) {
                User.findOne({ googleId: profile.id })
                    .then(
                        (user) => {
                            if (user !== null) {
                                console.log(`Exist user: ${user}`)
                                return cb(null, user)
                            } else {
                                new User({
                                    googleId: profile.id,
                                    email: profile.emails[0].value,
                                    name: profile.displayName
                                }).save()
                                    .then(
                                        res => cb(null, res)
                                    )
                            }
                        }
                    )
            } else {
                return cb(null, false)
            }
        }
    )
)

const FacebookStrategy = require('passport-facebook').Strategy
passport.use(new FacebookStrategy(
    {
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET_KEY,
        callbackURL: process.env.CALLBACK_URL_FACEBOOK
    },
    function verify(accessToken, refreshToken, profile, cb) {
        return cb(null, accessToken)
    }
))

const errorHandler = (res) => {
    return res.status(500).json({
        success: false,
        message: "Something went wrong"
    })
}

const ControllerAuth = {
    viewLogin: (req, res) => {
        return res.render('login')
    },
    loginGoogle: passport.authenticate(
        'google',
        {
            scope: ['profile', 'email']
        }
    ),
    redirectGoogle: passport.authenticate(
        'google',
        {
            successRedirect: '/oauth/success',
            failureRedirect: '/oauth'
        }
    ),
    loginFacebook: passport.authenticate(
        'facebook'
    ),
    redirectFacebook: (req, res) => {
        passport.authenticate(
            'facebook',
            {
                successRedirect: '/oauth/success',
                failureRedirect: '/oauth'
            }
        )
    },
    logout: (req, res) => {
        try {
            req.logout(
                (err) => {
                    if(err) errorHandler(res)
                }
            );
            return res.redirect('/oauth')
        } catch (error) {
            return errorHandler(res)
        }
    }
}
module.exports = ControllerAuth