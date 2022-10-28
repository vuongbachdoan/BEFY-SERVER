const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')

mongoose.connect(process.env.MONGODB_URI, () => {
    console.log('Connected to MongoDB')
})
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret: "secret",
    saveUninitialized: true,
    resave: true
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));
app.use('/oauth', require('./router/routerAuth'))
app.use('/api', require('./router/routerApp'))

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`)
})