require('../src/db/mongoose')
const User = require('../src/models/user.js')


//Promise Chaining

// User.findByIdAndUpdate('612fc0131d7553e95faff814',{age : 7}).then((user)=>{
//     console.log(user)
//   return  User.countDocuments({age : 7})
// }).then((count)=>{
//     console.log(count)
// })


//async and await

const findUserAndUpdate = async (_id , age)=>{
  const user = await User.findByIdAndDelete(_id,{age})
  const count = await User.count({age})
  return count
}

findUserAndUpdate('613123d19f66fa8f1df074a3',7).then((count)=>{
  console.log(count)
}).catch((e)=>{
  console.log(e)
})