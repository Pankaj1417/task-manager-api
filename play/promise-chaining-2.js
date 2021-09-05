require('../src/db/mongoose')
const { count } = require('../src/models/task')
const Task = require('../src/models/task')

Task.findByIdAndDelete('613123d19f66fa8f1df074a3').then((task)=>{
    console.log(task)
    return Task.countDocuments({completed : false})
}).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})


const findTaskAndDelete = async (id)=>{
    const task = await Task.findOneAndDelete(id)
    const count = await Task.countDocuments({completed : false})
    return count
}

findTaskAndDelete('613123d19f66fa8f1df074a3').then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})