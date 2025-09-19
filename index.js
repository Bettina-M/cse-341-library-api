const express = require ('express')
const app = express()
const database = require('./database/database')
const booksRoutes = require('./routes/books')
const userRoutes = require('./routes/user')
const cors = require('cors')
const swaggerDoc = require('./swagger-output.json')
const swaggerUi = require('swagger-ui-express')

require('dotenv').config()

database.dbConnect()

app.use(cors())

app.use(express.json())

app.use('/books', booksRoutes)

app.use('/user',userRoutes)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

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

})


