require('./db/mongoose')
const express=require("express")
const User=require('./models/users')
const Task=require('./models/tasks')
const UserRouter=require('./routers/users')
const TaskRouter=require('./routers/tasks')
const app=express()
const port=process.env.PORT
// const port=process.env.PORT||3000 // as created environment varialble removed 3000 and writtenas above


// without middleware : new request -> run route handler (exactly what we are doing now as get,post,patch)

// with middlewares   : new request -> do something -> run route handler
// dosomething is morethan a function that runs and we can setup this function to do whatever we'd like


// app.use((req,res,next)=>{
//         res.status(503).send("Site is under maintainence. sorry for the inconvenience")
// })

app.use(express.json())
app.use(UserRouter) // app.use to register the router here. generally it used to register something
app.use(TaskRouter)

// const UserRouter=new express.Router() // 3 steps for creating user below, Router is used for seperating the files for e.g this file is having all routes in one place to make it seperate we can use as many as Routers based on the resources. and as asingle file get longer and longer the best we use split those into small files
// UserRouter.get('/test',(req,res)=>{
//     res.send("i  am route tester")
// })

// app.use(UserRouter)
// app.use(express.json())

// app.post('/users',(req,res)=>{
//     const users=new User(req.body)

//     users.save().then(()=>{
//         console.log(users)    
//         res.send(users)
//     }).catch((err)=>{
//         console.log("error")
//         res.status(400)
//         res.send(err)
//     })
// })

// app.post('/users', async (req,res)=>{
//     const users=new User(req.body)
//     try{
//         await users.save()
//         res.status(201).send(users)
//     }catch(e){
//         res.status(400).send()
//     }
   

// })


// app.get('/users',async (req,res)=>{
//     try{
//         const user=await User.find({})
//         console.log(user)
//         res.status(400).send(user)
//     }catch(e){
//         res.status(401).send()
//     }
// })

// app.get('/users',(req,res)=>{
//     User.find({}).then((user)=>{
//         console.log(user)
//         res.status(400).send(user)
//     }).catch((e)=>{
        
//     })
// })


// app.get('/users/:id',async (req,res)=>{
//     try{
//         const user=await User.findById(req.params.id)
//         if(!user){
//             return res.status(404).send()
//         }
//         res.send(user)
//     }catch(e){
//         res.status(500).send()
//     }
// })


// app.get('/users/:id',(req,res)=>{
//     User.findById(req.params.id).then((user)=>{
//         if(!user){
//            return res.status(404).send()
//         }
//         res.send(user)
//     }).catch((e)=>{
//         res.status(500).send()
//     })
// })

// app.post('/tasks',async (req,res)=>{
//     const tasks=new Task(req.body)
//     try{
//         await tasks.save()
//         res.send(tasks)
//     }catch(e){
//         res.status(400).send(err)
//     }
// })

// app.post('/tasks',(req,res)=>{
//     const tasks=new Task(req.body)
//     tasks.save().then(()=>{
//         res.send(tasks)
//     }).catch((err)=>{
//         res.status(400)
//         res.send(err)
//     })
// })

// app.get('/tasks',async (req,res)=>{
//     try{
//         const user=await Task.find({})
//         console.log(user)
//         res.send(user)
//     }catch(e){
//         res.status(404).send()
//     }
// })


// app.get('/tasks',(req,res)=>{

//     Task.find({}).then((user)=>{
//         console.log(user)
//         res.status(400).send(user)
//     }).catch((e)=>{
//         res.status(404).send()
//     })
// })

// app.get('/tasks/:id',async (req,res)=>{
//     const _id=req.params.id
//     try{
//         const task=await Task.findById(_id)
//         if(!task){
//             return res.status(404).send()
//         }
//         res.send(task)
//     }catch(e){
//         res.status(500).send()
//     }
// })

// app.get('/tasks/:id',(req,res)=>{
//     const _id=req.params.id
//     Task.findById(_id).then((task)=>{
//         if(!task){
//            return res.status(404).send()
//         }
//         res.send(task)
//     }).catch((e)=>{
//         res.status(500).send()
//     })
// })

// options object runValidators:true is written because it validates the data that we try to update
// options object new:true is going to return the new user as opposed to the existing one that was found before the update(i.e it will get updated in data base but it will not show in the postman log due we have to click send twicw to show ther hence to this wehave to use NEW option )
// app.patch('/tasks/:id',(req,res)=>{
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


// app.patch('/users/:id',async (req,res)=>{
//     const _id=req.params.id
//     const updates=Object.keys(req.body)
//     const allowedUpdates=['name','email','password']
//     const isValidOperation=updates.every((key)=>allowedUpdates.includes(key))
//     if(!isValidOperation){
//         return res.status(404).send({error:"inValid Updates"})
//     }
//     try{
//         const user=await User.findByIdAndUpdate(_id,req.body,{runValidators:true})
//         if(!user){
//             return res.status(400).send()
//         }
//         res.send(user)
//     }catch(e){
//         res.status(404).send()
//     }
// })

// app.delete('/users/:id',async (req,res)=>{
//     try{
//        const user= await User.findByIdAndDelete(req.params.id)
//        if(!user){
//            return res.status(404).send()
//        }
//         // const c= await db.User.countDocuments({"password":"pd123asdxc"})
//         res.status("deleted").send(user)
//     }catch(e){
//         res.status(500).send()
//     }
// })

// app.delete('/tasks/:id', async (req,res)=>{
//     try{
//     const task=await Task.findByIdAndDelete(req.params.id)
//     if(!task){
//        return res.status(404).send()
//     }
//     res.send(task)
//    }catch(e){
//        res.status(500).send()
//    }

// })

app.listen(port,()=>{
    console.log("server is up on port " + port)
})


// const bcrypt=require('bcryptjs')

// const myFunc=async ()=>{
//     const password='Gowth@m'
//     const hashedpassword=await bcrypt.hash(password,8) // returns promise and bcrypt.hash(ourpassword, no.of times hashing needs to done for e.g. 8 as it is recomended)

//     console.log(password)
//     console.log(hashedpassword)

//     const verifyingUSer=await bcrypt.compare("Gowth@m",hashedpassword) // bcrytp.compare is used to compare our password with hashed password and verify user correct or not
//     console.log(verifyingUSer)
// }

// myFunc()


const jwt= require("jsonwebtoken")
const task = require('./models/tasks')

const myfunca=()=>{
    const token=jwt.sign({id:'abcd'},'randomsetofcharacters')
    console.log(token)

    const data=jwt.verify(token,'randomsetofcharacters')
    console.log(data)
}

myfunca()


// populate allows us to populate the data from a relationship such as  the data we have right here for owner next up to actually fire this off we use execPopulate() so instead of acessing only to owner id we have now access to the Object i.e whole User documenat
// const main=async ()=>{
//     // const task=await Task.findById('628f46d3b3be1532d49f49b2')
//     // await task.populate('owner').execPopulate()   
//     // console.log("task ",task.owner)      // here we get ownerID but what if we want name or email hence using ref on task model which gives access to whole User model and written above line of code 
//     const user=await User.findById('62942dc5063bc64654c2e99b')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }

// main()

