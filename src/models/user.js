const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required : true
    },
    email :{
        required : true,
        unique : true ,
        type : String,
        trim : true , 
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        },
        lowercase : true
    },
    age:{
        type : Number,
        default : 0,
        validator(value){
            if(value < 0){
                throw new Error('Age should be positive')
            }
        }
    },
    password : {
        type : String,
        required : true , 
        trim : true,
        minlength : 7,
        validate(value){
           if(value.toLowerCase().includes('password')){
               throw new Error('Password can not contain the word password')
           }
        }
    },
    tokens : [{
        token : {
            type:String,
            required:true
        }
    }]
})

userSchema.methods.getAuthToken = async function(){
    const user = this
   const token = jwt.sign({_id : user._id.toString()},'thisismyfirstbackendcourse')
   user.tokens = user.tokens.concat({token})
   await user.save()
    return token
}
userSchema.statics.findByCredentials = async (email,password)=>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error('Unable to login')
    }
    const isEqual = await bcrypt.compare(password,user.password)
    if(!isEqual){
        throw new Error('Password Missmatch')
    }
    return user
}


//Saving hashed password instead of plane one.
userSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})

const User = mongoose.model('Users',userSchema)

module.exports = User
