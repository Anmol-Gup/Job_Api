/* 
    Mongoose is a Object Data Modeling/Mapper (ODM) library for MongoDB & Nodejs 
    that helps to establish a connection between nodejs & mongodb
*/
const mongoose=require('mongoose')
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connection successful...")
}).catch((err)=>{
    console.log(err);
})

module.exports=mongoose