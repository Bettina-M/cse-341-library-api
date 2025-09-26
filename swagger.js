const swaggerAutogen = require('swagger-autogen')();
require('dotenv').config();

const doc = {
  info: {
    title: 'Library API',
    version: '1.0.0',
  },
  host: process.env.BASE_URL.replace(/^https?:\/\//, ''), // e.g. your-app.onrender.com
  schemes: [process.env.NODE_ENV === 'production' ? 'https' : 'http'],
  basePath: '/',
  securityDefinitions: {
    cookieAuth: {
      type: 'apiKey',
      in: 'cookie',
      name: 'connect.sid',
      description: 'Session cookie for authentication (Passport sessions)',
    },
    oauth2: {
      type: 'oauth2',
      flow: 'accessCode',
      authorizationUrl: `${process.env.BASE_URL}/auth/google`,
      tokenUrl: `${process.env.BASE_URL}/auth/google/callback`,
      scopes: {},
    },
  },
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./index.js']; 

swaggerAutogen(outputFile, endpointsFiles, doc);