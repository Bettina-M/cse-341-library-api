const swaggerAutogen = require('swagger-autogen')


const doc = {
    info: {
        title: 'Library API',
        description: 'API documentation for library service',
    },
    host: 'cse-341-library-api-fpy9.onrender.com',
    schemes: ['https'],
    components: {
        securitySchemes: {
            oauth2: {
                type: 'oauth2',
                flows: {
                    authorizationCode: {
                        authorizationUrl: "https://dev-gbwrsi3upfsfczwp.us.auth0.com/authorize",
                        tokenUrl: "https://dev-gbwrsi3upfsfczwp.us.auth0.com/oauth/token",
                        scopes: {
                            "openid": "OpenID Connect scope",
                            "profile": "User profile info",
                            "email": "User email",
                            "read:books": "Read access to books"
                        }
                    }
                }
            }
        }
    },
    
}

const outputFile = './swagger-output.json'
const endpointsFiles = ['./index.js']

swaggerAutogen(outputFile, endpointsFiles, doc)