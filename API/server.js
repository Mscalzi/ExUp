const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
const cors = require('cors')

// cross origin resource security prevents errors that have to do with routes
app.use(cors())
app.use(express.json())

const mongoURI = process.env.MONGO_URI

// function to connect to mongoDB Uniform Resource Identifier
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  //sets our connection to a variable
let db = mongoose.connection

//console.log that connect has been made to DB 
db.once('open', () => {
    console.log('DB CONNECT--from server.js ')
  })

const Routes = require('./routes/routes.js')

app.use('/', Routes)

app.use('/login', (req, res)=>{
    // res.send('Connected to API from server.js')
    console.log((req,res),'API connect from server.js')
})
//activates express to listen at port 8000
setTimeout(()=>{
    app.listen(8000, ()=>{
        console.log('listening from server.js')
    })
}, 500)





