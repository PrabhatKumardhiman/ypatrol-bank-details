const express = require('express')
const app = express()
const dotenv = require('dotenv');
const cors = require('cors')

dotenv.config()// receving files form .env


app.use(express.json())
app.use(cors())

// Function to Connect to MONGODB
const connectToMongo = require('./connectToMongo');
connectToMongo()

// Response on http://localhost:5000/
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Creating Routes from different CRUD Operation 
app.use('/api/details', require('./routes/details'))

app.listen(process.env.APP_PORT, () => {
  console.log(`Example app listening on port ${process.env.APP_PORT}`)
})