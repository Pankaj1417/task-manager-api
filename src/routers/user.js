const express = require('express')
const router = new express.Router()
const User = require('../models/user')


//Creating endpoint /users - this creates a user   ----------------- using async await
router.post('/users',async (req, res)=>{
    const user = new User(req.body)
    try{
       await user.save()
        res.status(201).send(user)
    }catch(e){
        res.status(400).send(e)
    }
})

//creating endpoint /users - this fetches all the users
router.get('/users',async (req,res) =>{
    try{
       const allUsers = await User.find({})
        if(!allUsers){
           return res.status(404).send()
        }
        res.send(allUsers)
    }catch(e){
        res.status(500).send(e)
    }
})

//creating endpoint /users/id for finding user by id
router.get('/users/:id',async (req,res)=>{
    const _id = req.params.id
    try{
    const currentUser =  await  User.findById(_id)
      if(!currentUser){
          return res.status(404).send()
      }
      res.send(currentUser)
    }catch(e){
        res.status(500).send(e)
    }
})

//Creating endpoint for user Data update  /users/:id ------>using async await and ignoring invalid updates
router.patch('/users/:id',async (req,res)=>{
    //data to be updated
    const toBeUpdated = Object.keys(req.body)
    //all allowed updates
    const allowedUpdates = ['name','age','password']
    //checking for data to be updates as it is allowed or not
    const isValidUpdate = toBeUpdated.every((update)=>allowedUpdates.includes(update))
    if(!isValidUpdate){
        return res.status(400).send({
            Error : 'This update is invalid'
        })
    }
    try{
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{new :true , runValidators : true})
        if(!user){
            res.status(404).send()
        }
        res.status(200).send(user)
    }catch(e){
        res.status(400).send()
    }
})

//Creating endpoint to delete user
router.delete('/users/:id',async (req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            res.status(404).send()
        }
        res.status(200).send(user)
    }catch(e){
        res.status(500).send()
    }
})


module.exports = router
