require('dotenv').config()
require('./connection')
const express=require('express');
const app=express();
const port=process.env.PORT||3000
const router=require('./jobs_router')
const cors = require('cors');
const bodyParser = require('body-parser');

// Allow requests from 'https://jobsearch-alpha.vercel.app/'
const corsOptions = {
    origin: 'https://jobsearch-alpha.vercel.app/',
    methods: ['GET','POST','DELETE'] // Allow only DELETE requests
};
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://jobsearch-alpha.vercel.app/');
    // Add other CORS headers as needed
    next();
});
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use(express.json())

// Register router
app.use(router)

app.listen(port,()=>{
    console.log(`Server is running at ${port}...`);
})