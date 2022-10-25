const express = require('express')
const app = express()
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/auth', require('./router/routerAuth'))

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`)
})