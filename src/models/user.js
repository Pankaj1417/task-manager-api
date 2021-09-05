const mongoose = require('mongoose')
const validator = require('validator')

const Users = mongoose.model('Users',
{
    name : {
        type : String,
        trim : true,
        required : true
    },
    email :{
        required : true,
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
    }
})

module.exports = Users
