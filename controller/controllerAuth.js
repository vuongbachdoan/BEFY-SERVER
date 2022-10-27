const express = require('express')
require('dotenv').config()
const User = require('../model/modelUser')
const passport = require('passport')

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser(function(user, done) {
    done(null, user);
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
            User.findOne({ googleId: profile.id })
                .then(
                    (user) => {
                        console.log(user)
                        if (user !== null) {
                            console.log(`Exist user: ${user}`)
                            cb(null, user)
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
        console.log(profile)
        console.log(accessToken)
        cb(null, profile)
    }
))

const errorHandler = (res) => {
    return res.status(500).json({
        success: false,
        message: "Something went wrong"
    })
}

const ControllerAuth = {
    viewLogin: async (req, res) => {
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
    redirectFacebook: passport.authenticate(
        'facebook',
        {
            successRedirect: '/oauth/success',
            failureRedirect: '/oauth'
        }
    )
}
module.exports = ControllerAuth