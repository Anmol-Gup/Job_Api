require('dotenv').config()
require('./connection')
const express=require('express');
const app=express();
const port=process.env.PORT||3000
const router=require('./jobs_router')
const cors = require('cors');
const bodyParser = require('body-parser');

// Allow requests from 'http://127.0.0.1:5500'
const corsOptions = {
    origin: 'http://127.0.0.1:5500',
    methods: 'DELETE' // Allow only DELETE requests
};

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    // Add other CORS headers as needed
    next();
});

// Register router
app.use(router)

app.listen(port,()=>{
    console.log(`Server is running at ${port}...`);
})