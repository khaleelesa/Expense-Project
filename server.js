// Server setup
const express = require('express')
const app = express()
const api = require('./server/routes/api')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Mongoose setup
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/ExpensesDb', { useNewUrlParser: true })

app.use('/', api)

const port = 3000
app.listen(port, function() {
    console.log(`Running on port ${port}`)
})