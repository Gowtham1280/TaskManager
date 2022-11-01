//every request that client do have to be authenticated so instead of signuo and logging again explicitly we are authenticatiing users with generated token to verify them. hence writing this file of code to authenticate the user for other requests like update ,delete and read. for signup and login no need of authentication

const jwt=require('jsonwebtoken')
const User=require('../models/users')

const auth= async (req,res,next)=>{
    console.log('in auth.js')
    try{
        const token=req.header('Authorization').replace('Bearer ','')
        // const decoded=jwt.verify(token,'randomsetofcharacters') // used env variable below
        const decoded=jwt.verify(token,JWT_SECRET)
        const user=await User.findOne({_id:decoded._id,'tokens.token':token})
        if(!user){
            throw new Error()
        }
        req.token=token
        req.user=user
        // console.log("user ",user)
        next()
    }catch(e){
        res.status(401).send({error:'please authenticate'})
    }
}
module.exports=auth
