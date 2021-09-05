const express = require('express')
const router = new express.Router()
const Task = require('../models/task')
  


//creating endpoint /tasks - this creates a task
router.post('/tasks',async (req , res)=>{
    const task = new Task(req.body)
    try{
       await task.save()
       res.status(201).send(task)

    }catch(e){
        res.status(400).send(e)
    }
})

// creating endpoint /users to fetch all the tasks created 
router.get('/tasks',async (req,res) =>{
    try{
       const allTasks = await Task.find({})
        if(!allTasks){
            return res.status(404).send()
        }
        res.send(allTasks)
    }catch(e){
        res.status(500).send(e)
    }
})

//creating endpoint /tasks/id  --- to find task by its id
router.get('/tasks/:id',async (req,res)=>{
    const _id = req.params.id
    try{
        const currentTask = await Task.findById(_id)
        if(!currentTask){
            return res.status(404).send()
        }
        res.send(currentTask)
    }catch(e){
        res.status(500).send()
    }
})

//Creating route for updating  tasks

router.patch('/tasks/:id',async (req,res)=>{
    const toBeUpdated = Object.keys(req.body)
    const allowedUpdates = ['description','completed']
    const isValid = toBeUpdated.every((update=> allowedUpdates.includes(update)))
    if(!isValid){
       return res.status(400).send({
            Error : 'This is invalid request'
        })
    }
    try{
        const task = await  Task.findByIdAndUpdate(req.params.id , req.body , { new : true , runValidators : true})
        if(!task){
            res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send()
    }
})

router.delete('/tasks/:id',async (req,res)=>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task){
            res.status(404).send()
        }
        res.status(200).send(task)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router