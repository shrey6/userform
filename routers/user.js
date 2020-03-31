const express = require('express')
const User = require('../models/user')
const path = require('path')
const publicDirectoryPath = path.join(__dirname,'../public')
// console.log(path.join(__dirname,'../public'))
// console.log(path.join(__dirname,'../public/index.html'))
const router = new express.Router()
router.use('',express.static(publicDirectoryPath))

// router.get('',async(req,res)=>{
//     await res.send('<h1>User</h1>')
// })
router.post('/users',async(req,res)=>{
    const user = new User(req.body)
    try{
    await user.save()
    res.status(201).send(user)
}catch(e){
    res.status(400).send(e)
}
    // user.save().then(()=>{
    //     res.send(user)
    // }).catch((e)=>{
    //     res.send(400).send(e)
    // })
})
router.get('/users',async(req,res)=>{
    User.find({}).then((users)=>{
        res.send(users)
    }).catch((e)=>{

    })  
})
module.exports=router
