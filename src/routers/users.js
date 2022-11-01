const express=require('express')
const User=require('../models/users')
const router=new express.Router()
const jwt=require('jsonwebtoken')
const auth=require('../middleware/auth')
const multer=require('multer')
const sharp=require('sharp')
const {sendWelcomeEmail,sendCancellationEmail}=require('../emails/account')

router.post('/users', async (req,res)=>{
    const users=new User(req.body)
    try{
        await users.save()
        // sendWelcomeEmail(req.user.email, req.user.name)
        const token=await users.generateAuthToken()
        // console.log({users, token})
        res.status(201).send({users,token})
    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})



// continued from models/users.. so right here user defined by credentials will call whatever is defined on userSchema.statics defined 
router.post('/users/login', async (req,res)=>{
    try{
        const user=await User.findByCredentials(req.body.email, req.body.password)
        console.log("userCred ", user)
        const token=await user.generateAuthToken()
        // const token=jwt.sign({_id:user._id},'randomsetofcharacters')  // instead of duplicating code here and in above post i created a instance on Model using .models and so we can access everywhere we want
        // res.send({user:user.clearPublicViews(),token})
        res.send({user,token})
    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})

router.post('/users/logout',auth,async (req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter((tokenIntokens)=>{
            return tokenIntokens.token!==req.token
        })
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

router.post('/users/logoutAll',auth,async (req,res)=>{
    try{
        req.user.tokens=[]
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

router.get('/users',auth,async (req,res)=>{
    try{ 
        const user=await User.find({})         // instead of seeing all the users only the user who authenticated user details are find (as writen below single line code) hence commented this
        console.log(user)
        res.status(200).send(user)
    }catch(e){
        console.log(e)
        res.status(401).send()
    }

})

router.get('/users/me',auth,async (req,res)=>{
    res.send(req.user)
})

// as above we have directly 'user/me' which fetches our own record then no need of '/users/:id'
// router.get('/users/:id',async (req,res)=>{
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

router.patch('/users/me',auth,async (req,res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdates=['name','email','password']
    const isValidOperation=updates.every((key)=>allowedUpdates.includes(key))

    if(!isValidOperation){
        return res.status(404).send({error:"inValid Updates"})
    }
    try{

        // const user= await User.findById(req.params.id)
        const user=req.user
        updates.forEach((update)=>{
            user[update]=req.body[update]
        })
        await user.save()
        // the findByIdAndUpdate method byPasses the mongoose it performs a direct operation on the dataBase that why onlu we use runValidators hence written above 3 steps 
        // const user=await User.findByIdAndUpdate(_id,req.body,{runValidators:true})
        // if(!user){                                      // commented because we know that user will pucca exists through above code
        //     return res.status(400).send()
        // }
        res.send(user)
    }catch(e){
        res.status(404).send(e)
    }
})


// removed '/users/:id' and written as below
router.delete('/users/me',auth,async (req,res)=>{
    try{
    //    const user= await User.findByIdAndDelete(req.params.id)
    //    if(!user){
    //        return res.status(404).send()
    //    }
        await req.user.remove()      // like as save we also have a delete method to delete and commented above because we have already have user details in auth function so we directly too it here
        sendCancellationEmail(req.user.email,req.user.name)
        res.status(200).send(req.user)
    }catch(e){
        res.status(500).send()
    }
})

// limits ==> which limits the file size
const upload=multer({
    // 'dest':'avatar',
    limits:{
        fileSize:1000000 //1 mb
    },
    // fileFilter called by multer internaly req--> contains the info about request we made, file--> contains the info about the file being uploaded(i.e filename), cb--> callback
    fileFilter(req,file,cb){
        // if(!file.originalname.endsWith('.pdf')){
        //    return cb(new Error('file extension not supported should be .pdf'))
        // }
        // regex(written regular expression)
        // if(!file.originalname.match(/\.(doc|docx)$/)){
        //     return cb(new Error('please upload a word document'))
        // }
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('file not supported. please upload an image'))
        }
        cb(undefined,true)
        // cb(new Error('file extension not supported should be .pdf'))
        // cb(undefined,true)
        // talking about below line here first argument udefined(saying that nothing went wrong ),true (boolean) to accept or false(to silentluy reject it)
        // cb(undefined,false)
    }
})
//upload.single('avatar')
// const errorMiddleware=(req,res,next)=>{
//     throw new Error("in error middleware")

// }
// the third thing is called error handling middleware
router.post('/user/me/avatar', auth , upload.single('avatar') , async (req,res)=>{
    const buffer=await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer()
    // req.user.avatar=req.file.buffer
    req.user.avater=buffer
    await req.user.save()
    res.send()
},(err,req,res,next)=>{
    res.status(400).send({'error':err.message})
})

router.delete('/user/me/avatar',auth,async (req,res)=>{
    req.user.avatar=undefined
    await req.user.save()
    res.status(200).send()
})

router.get('/user/:id/avatar',async (req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        
        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-Type','image/jpg')
        res.send(user)
    }catch(e){
        res.status(404).send()
    }
})

module.exports=router