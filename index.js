const express = require('express')
require('./db/mongoose.js')
const User = require('./models/user.js')
const userRouter = require('./routers/user')
const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.use(userRouter)
// const router = new express.Router()
app.listen(port,()=>{
    console.log('server up and running '+port)
})
