const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const userRoute = require('./routers/user')
const taskRoute = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

//json as a function is passed to app.use to automatically parse the json data provided to the body of the requset as the object
app.use(express.json())
app.use(userRoute)
app.use(taskRoute)

app.listen(port ,()=>{
    console.log('Server is up and running on port '+ port)
})
