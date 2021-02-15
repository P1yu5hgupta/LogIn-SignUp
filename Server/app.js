const express = require('express')
const app=express()
const config = require("./config.js")

const signIn = require("./controllers/signIn.js")
const signUp = require("./controllers/signUp.js")
const bodyParser = require("body-parser")

app.use(bodyParser.json())
app.post('/signin',signIn)
app.post('/signup',signUp)

app.listen(config.port, () => {
    console.log(`App is listening at http://localhost:`+ config.port)
})
