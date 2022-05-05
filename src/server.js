const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./db/db')


const port = process.env.PORT
const app = express()

connectDB()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(errorHandler)

app.use('/api/goals', require('./routes/goal'))
app.use('/api/users', require('./routes/user'))



app.listen(port, () => console.log(`Server started on port ${port}`))
