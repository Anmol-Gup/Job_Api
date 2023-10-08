/*
    A Mongoose schema defines the structure of the document, default, validators, etc.
    A Mongoose model (creating collection) provides an interface to the database for creating, querying, updating, deleting records, etc.
*/
const mongoose=require('mongoose')
const validator=require('validator')

const job_schema=mongoose.Schema({
    company:{
        type:String,
        require:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(value==='')
                throw new Error("Field cannot empty")
        }
    },
    role:{
        type:String,
        require:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(value==='')
                throw new Error("Field cannot empty")
        }
    },
    url:{
        type:String,
        require:true,
        trim:true,
        validate(value){
            if(value==='')
                throw new Error("Field cannot empty")
            if(!validator.isURL(value))
                throw new Error("Invalid Url")
        }
    },
    postedAt:{
        type:Date,
        default:Date.now
    }
})

// collection creation
const Jobs=mongoose.model('Job',job_schema);
module.exports=Jobs;
