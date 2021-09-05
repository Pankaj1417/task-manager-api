const {ObjectId , MongoClient} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL , { useNewUrlParser: true },(error, client)=>{
    if(error){
        return console.log('Some error occured !')
    }
    const db = client.db(databaseName)
    // db.collection('users').findOne({_id : new ObjectId('612548534654db7041b1c0da')},(error, user)=>{
    //     if(error){
    //         return console.log(error)
    //     }
    //     console.log(user)
    // })

    // db.collection('tasks').updateMany({
    //     completed : false
    // },{
    //     $set:{
    //         completed:true
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) =>{
    //     console.log(error)
    // })

    db.collection('tasks').deleteOne({
        description : 'Internship'
    }).then((result) => {
        console.log(result.deletedCount)
    }).catch((error) => {
        console.log(error)
    })
})