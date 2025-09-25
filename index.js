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
};


// this helps us access the user profile info
app.use(auth(config))



/*app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDoc, {
    swaggerOptions: {
      oauth2RedirectUrl: `${process.env.BASE_URL}/api-docs/oauth2-redirect.html`,
      persistAuthorization: true,
      initOAuth: {
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET, 
        realm: "Auth0",
        appName: "Library API",
        scopeSeparator: " ",
        scopes: "openid profile email read:books",
        additionalQueryStringParams: {},
        usePkceWithAuthorizationCodeGrant: true
      }
    }
  })
);*/


app.get('/', (req, res) =>{
    res.send(req.oidc.isAuthenticated()? 'Logged in':'Logged out');
})

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
})

app.use('/books', booksRoutes)

app.use('/user',userRoutes)



const port = process.env.PORT

app.get('/', (req, res) =>{
    res.send("Hello World")
})

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDoc, {
        swaggerOptions: {
            oauth2RedirectUrl: `${process.env.BASE_URL}/api-docs/oauth2-redirect.html`,
            persistAuthorization: true,
            // This ensures the authorize button appears
            authAction: {
                oauth2: {
                    name: "oauth2",
                    schema: {
                        type: "oauth2",
                        flows: {
                            authorizationCode: {
                                authorizationUrl: "https://dev-gbwrsi3upfsfczwp.us.auth0.com/authorize",
                                tokenUrl: "https://dev-gbwrsi3upfsfczwp.us.auth0.com/oauth/token",
                                scopes: {
                                    openid: "OpenID connect",
                                    profile: "User profile",
                                    email: "User email",
                                    "read:books": "Read books"
                                }
                            }
                        }
                    },
                    value: {
                        clientId: process.env.CLIENT_ID,
                        clientSecret: process.env.CLIENT_SECRET || ""
                    }
                }
            },
            initOAuth: {
                clientId: process.env.CLIENT_ID,
                appName: "Library API",
                scopeSeparator: " ",
                scopes: "openid profile email read:books",
                usePkceWithAuthorizationCodeGrant: true
            }
        }
    })
);
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

})


