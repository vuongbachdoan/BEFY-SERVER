const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')

mongoose.connect(process.env.MONGODB_URI, () => {
    console.log('Connected to MongoDB')
})
app.set('view engine', 'ejs')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// app.use(cookieSession({
//     name: 'user',
//     keys: ['NKCjCACK'],
//     maxAge: 24 * 60 * 60 * 1000,
// }))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));
app.use('/oauth', require('./router/routerAuth'))
app.use('/api', require('./router/routerApp'))

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`)
})