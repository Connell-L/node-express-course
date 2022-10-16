const express = require('express')
const app = express()

const people = require('./routes/people');
const auth = require('./routes/auth');

// static assets
app.use(express.static('./methods-public'))
// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json
app.use(express.json())

// app.use for paths /api/people ...
// middlewear
app.use('/api/people', people);

// route for login
app.use('/login', auth);

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})
