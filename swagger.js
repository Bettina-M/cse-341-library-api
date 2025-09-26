const swaggerAutogen = require('swagger-autogen')();

const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Library API', version: '1.0.0' },
    servers: [{ url: process.env.BASE_URL || 'http://localhost:8080' }],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'connect.sid',
          description: 'Session cookie for authentication (Passport sessions)'
        },
        oauth2: {
          type: 'oauth2',
          flows: {
            authorizationCode: {
              authorizationUrl: `${process.env.BASE_URL}/auth/google`,
              tokenUrl: `${process.env.BASE_URL}/auth/google/callback`,
              scopes: {}
            }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./index.js']; 

swaggerAutogen(outputFile, endpointsFiles, options);