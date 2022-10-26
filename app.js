const cookieSession = require('cookie-session')
const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const passport = require('passport')

mongoose.connect(process.env.MONGODB_URI, () => {
    console.log('Connected to MongoDB')
})
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000,
        keys: [process.env.CLIENT_ID]
    })
)
app.use(passport.initialize())
app.use(passport.session())

app.use('/oauth', require('./router/routerAuth'))

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`)
})