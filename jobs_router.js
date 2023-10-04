const express=require('express')
const Job = require('./jobs');

// Create a new router
const router=express.Router();

// Define router
router.get('/',(req,res)=>{
    res.send("Hello, World!");
})
router.get('/getjobs',async (req,res)=>{
    try{
        const jobs=await Job.find()
        res.status(200).json(jobs);
    }catch(err){
        res.status(500).send(err);
    }
})
router.get('/getjobs/job/',async (req,res)=>{
    try{
        const page=parseInt(req.query.page) || 1
        const limit=parseInt(req.query.limit) || 10;
        const skip=(page-1)*limit;
        const jobs=await Job.find().skip(skip).limit(limit).sort({postedAt:-1});
        // console.log(jobs)
        const alljobs=await Job.find()

        res.status(200).json({jobs,length:jobs.length,totaljobs:alljobs.length});
    
    }catch(err){
        res.status(500).send(err);
    }
})
router.post('/addjob',async (req,res)=>{
    try{
        const job=new Job(req.body)
        const result=await job.save();
        res.status(200).json(result)
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})

router.delete('/deletejob/:id',async(req,res)=>{
    try{
        // const result=await Job.deleteOne({_id})
        if(!req.params.id)
            res.status(400).json("Could find job with specified id");

        const result=await Job.findByIdAndDelete(req.params.id)
        // console.log(result)
        res.status(200).json(result);
    }
    catch(err){
        res.status(500).send(err);
    }
})

module.exports=router;