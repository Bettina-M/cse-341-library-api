const swaggerAutogen = require('swagger-autogen')
c

const doc = {
    info:{
        title: 'Library API',
        description : 'API documentation for library service',
    },
    host:'https://cse-341-library-api-fpy9.onrender.com/',
    schemes: ['https'],
}

const outputFile = './swagger-output.json'

const endpointsFiles =['./index.js']

swaggerAutogen(outputFile, endpointsFiles, doc)
