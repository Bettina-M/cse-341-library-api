const express = require ('express')
const app = express()
const passport = require('passport');
const mongoose = require('mongoose')
//const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const session = require('express-session')

const database = require('./database/database')
const booksRoutes = require('./routes/books')
const userRoutes = require('./routes/user')
const swaggerDoc = require('./swagger-output.json')
const passportConfig = require('./config/passport');
const authRoutes = require('./routes/auth')
//const {requiresAuth} = require('express-openid-connect')
const { auth } = require("express-oauth2-jwt-bearer");

require('dotenv').config()

database.dbConnect()
app.use(express.json())


app.use(session({
  secret: process.env.SESSION_SECRET || 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, secure: false }
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);


//routes

app.use('/books',booksRoutes)

app.use('/user', userRoutes)

app.use('/auth', authRoutes)



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc, {
  swaggerOptions: {
    oauth2RedirectUrl: `${process.env.BASE_URL}/auth/google/callback`
  }
}));

//root route
app.get('/', (req, res) => res.send('Library API'));

//middlware
app.use((err, req, res, next) =>{
    console.error(err.stack)
    res.status(500).json({error: err.message})
})

//404 error handler
app.use((req, res, next) =>{
    res.status(404).json({error: 'Route not found'})
})


const port = process.env.PORT || 8080

app.listen(port, () =>{
   console.log(`App listening on http://localhost:${port}`)

})


