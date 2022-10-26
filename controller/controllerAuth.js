const express = require('express')
require('dotenv').config()
const User = require('../model/modelUser')
const passport = require('passport')

passport.serializeUser((user, done) => {
    done(null, user.id)
})
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user)
        })
})

const GoogleStrategy = require('passport-google-oidc')
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL
        },
        function verify(issuer, profile, cb) {
            User.findOne({ googleId: profile.id })
                .then(
                    (user) => {
                        console.log(user)
                        if (user !== null) {
                            console.log(`Exist user: ${user}`)
                        } else {
                            new User({
                                googleId: profile.id,
                                email: profile.emails[0].value,
                                name: profile.displayName
                            }).save()
                            .then(
                                res => console.log(res)
                            )
                        }
                    }
                )

        }
    )
)

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
            failureRedirect: '/oauth/fail'
        }
    )
}

module.exports = ControllerAuth