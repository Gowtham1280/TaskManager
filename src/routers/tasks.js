const express=require("express")
const router=express.Router()
const Task=require('../models/tasks')
const auth=require('../middleware/auth')

router.post('/tasks',auth,async (req,res)=>{
    // const tasks=new Task(req.body)
    const tasks=new Task({
        ...req.body,
        owner:req.user.id,
    })
    try{
        // console.log("tasks ",tasks)
        await tasks.save()
        res.send(tasks)
    }catch(e){
        res.status(400).send()
    }
})

// router.get('/tasks',auth, async (req,res)=>{
//     const _id=req.params.id
//     try{
//         // const task=await Task.find({})
//         // const task=await Task.find({owner:req.user._id})
//         const res=await req.user.populate('tasks').execPopulate()
//         console.log("res ",res)
//         res.send(req.user.tasks)
//     }catch(e){
//         res.status(404).send()
//     }
// })

//@ dont know above code not worked though same hence written this code
//GET  /tasks?ompleted=true
//GET  /tasks?limit=2&skip=2 as part of parametres we provided in query is a string for e.g limt=2 or completed=true here 2 and true are strings hence parsing below /tasks?limit=2&skip=2(i.e skip 1st 2 and limity next results/page to 2)
//GET  /tasks?sortBy=createdAt:desc
router.get('/tasks',auth, async (req,res)=>{
    try{
        // await req.user.populate('tasks').execPopulate()
        const match={}
        if(req.query.completed){
            match.completed=req.query.completed==='true'
        }
        const sort={}
        if(req.query.sortBy){
            console.log(req.query.sortBy)
            const parts=req.query.sortBy.split(':')
            console.log(parts)
            sort[parts[0]]=parts[1]==='asc'? 1:-1
        }
        // match is an object and in here we can specify exactly which tasks we are trying to match
        // options object is used for paginating and also used for sorting as well
        await req.user.populate({
            path:'tasks',
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort,                           // we can also write as sort:{createdAt:1 or -1(i.e ascending or descending order)} we can directly hardcode here itself
            }
        }).execPopulate()
        res.status(200).send(req.user.tasks)
        console.log("tasks find ", req.user.tasks)
    }catch(e){
        res.status(404).send(e)
    }
})

router.get('/tasks/:id',auth,async (req,res)=>{
    const _id=req.params.id
    try{
        // const task=await Task.findById(_id)
        const task=await Task.findOne({_id,owner:req.user._id})
        console.log("taskrouer ",task,{owner:req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send()
    }
})

// router.patch('/tasks/:id',(req,res)=>{
//     const updates=Object.keys(req.body)
//     const allowedUpdates=['completed','description']
//     const isValidOperation=updates.every((key)=>{
//         return allowedUpdates.includes(key)
//     })
//     if(!isValidOperation){
//         return res.status(404).send({error:"inValid Updates"})
//     }
//     const _id=req.params.id
//         Task.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true}).then((task)=>{
//         if(!task){
//             return res.status(404).send()
//         }
//         console.log(task)
//         res.send(task)
//     }).catch((e)=>{
//         console.log('error validation failed',e)
//         res.status(500).send()
//     })
// })

router.patch('/tasks/:id',async (req,res)=>{
    const _id=req.params.id
    const updates=Object.keys(req.body)
    const validUpdates=['description','completed']
    const isValidOperation=updates.every(key=>validUpdates.includes(key))
    if(!isValidOperation){
        return res.status(404).send({"error":"inValid Updates"})
    }
    try{
        const task=await Task.findById(_id)
        updates.forEach((update)=>{
            task[update]=req.body[update]
        })
        await task.save()
        // const task= await Task.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true})
        if(!task){
            return res.status(400).send()
        }
        res.send(task)
    }catch(e){
        res.status(404).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req,res)=>{
    try{
    const task=await Task.findByIdAndDelete({_d:req.params.id, owners:req.user._id})
    if(!task){
       return res.status(404).send()
    }
    res.send(task)
   }catch(e){
       res.status(500).send(e)
   }
})

module.exports=router