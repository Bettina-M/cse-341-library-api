const express = require ('express')
const app = express()
const database = require('./database/database')
const booksRoutes = require('./routes/books')
const userRoutes = require('./routes/user')
const cors = require('cors')
const swaggerDoc = require('./swagger-output.json')
const swaggerUi = require('swagger-ui-express')
const {auth, requiresAuth} = require('express-openid-connect')

require('dotenv').config()

database.dbConnect()

app.use(cors())

app.use(express.json())

// this will set up the auth router on /login, /logout, and /callback
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    authorizationParams: {
    audience: process.env.AUDIENCE,
    scope: 'openid profile email'
  }
}

// this helps us access the user profile info
app.use(auth(config))

app.get('/', (req, res) =>{
    res.send(req.oidc.isAuthenticated()? 'Logged in':'Logged out');
})

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
})

app.use('/books', booksRoutes)

app.use('/user',userRoutes)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc,{
    swaggerOptions:{
        oauth2RedirectUrl: `${process.env.BASE_URL}/api-docs/oauth2-redirect.html`,
        oauth:{
          clientID: process.env.CLIENT_ID,
          scopes: "openid profile email" ,
          usePkceWithAuthorizationCodeGrant: true
        }
    }
}))

const port = process.env.PORT

app.get('/', (req, res) =>{
    res.send("Hello World")
})
//middlware
app.use((err, req, res, next) =>{
    console.error(err.stack)
    res.status(500).json({error: err.message})
})

//404 error handler
app.use((req, res, next) =>{
    res.status(404).json({error: 'Route not found'})
})


app.listen(port, () =>{
   console.log(`App listening on http://localhost:${port}`)
   console.log("SECRET:", process.env.SECRET)

})


