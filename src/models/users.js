const validator=require('validator')
const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const Task=require('../models/tasks')


const userSchema=new mongoose.Schema({                     
    name:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        required:true,
        type:String,
        trim:true,
        minlength:6,
        validate(value){
            if(value.includes("password")){
                throw new Error("password cannot contain password");
            }
        },

    },
    email:{
        type:String,
        unique:true,
        trim:true,
        validate(email){
            if(!validator.isEmail(email)){
                throw new Error("invalid email");
            }
        },
    },
    tokens:[{
        token:{
            type:String,
            required:true,
        }
    }],
    avatar:{
        type:Buffer
    },
},
{
    timestamps:true
}
)

// by setting up a value on userSchema.statics we're setting that up as something we can access directly from the model, once we actually have access to it.
// userSchema.statics.findByCredentials= async (email,password)=>{
//     const user=await User.findOne({email})
//     if(!user){
//         throw new Error("unable to login email")
//     }

//     const isMatch=await bcrypt.compare(password,user.password)
//     console.log(isMatch)
//     if(isMatch){
//         throw Error('invalid password')
//     }
//     return user
// }

// like tokens array we're not gonna do for a tasks as. it leaves in a different collection instead we setup known as a virtual properity(virtual propert is not actual data stored in the data base. it's a relationship between two entities here our task and user)
userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})

userSchema.statics.findByCredentials=async (email,password)=>{
    const user=await User.findOne({email})
    if(!user){
        throw new Error('invalid login attempt email')
    }

    const match=await bcrypt.compare(password,user.password)
    console.log("ppwd ",user.password)
    console.log(match)
    if(!match){
        throw new Error('invalid login attempt password')
    }
    return user
}

// methods are accessible on instances sometimes called (instance methods) as statics method is directly accessible on Model(sometimes called model methods)
userSchema.methods.generateAuthToken=async function(){
    const user=this
    const token=jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET)  // kept in environment variable
    // const token=jwt.sign({_id:user._id.toString()},'randomsetofcharacters')
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token

}

// when we save res.send JSON STRINGIFY will get called on the user we set-up a toJSON method on the user were'we manipulate the object asd sending back the properties just we want to expose 
userSchema.methods.toJSON =function(){
    const user=this
    const userObject=user.toObject()
    console.log("userObject ",userObject)
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    return userObject
}

// this is same as above but used as different
// userSchema.methods.clearPublicViews =function(){
//     const user=this
//     const userObject=user.toObject()
//     console.log("userObject ",userObject)
//     delete userObject.password
//     delete userObject.tokens

//     return userObject
// }

// a method on 'save'(name of the event),userShema to set the middleware up. and there are 2 methods to set up for the middleware they are 1) pre : for doing something before an event. like before validation or before saving 2) post : for doing something after an event such as after the user has been saved
// here we need the save and a function to run and it should be a standard function and not the arrow function because 'this' binding plays an important role as arrow function dont bind 'this'
// here 'this' gives us access about the individual user that's about to be saved
// lets talk about NEXT. the whole point of this is to run some code before a user is saved. but how does it know we're done ruuning our code? now it just say the function is over, but that wouldn't account for any asynchronous process which might be occuring so that's why NEXT is provided. we simply call next when we are done rigth here, we call next() at end of the fuction.
// if we didnt write next() this will hang forever as it assumes that some code is running before we save the user. and it will never actually save the user
// below code is to hash the plain text password before saving
// userSchema.pre('save', async function (next){
//  const user=this
//  console.log("just before saving")
//  if(user.isModified('password')){
//      user.password=await bcrypt.hash(user.password,8)
//  }

// next()

// })


// whenever a user is removed it will run and removes all the tasks as well
userSchema.pre('remove', async function (next){
    const user=this
    await Task.deleteMany({owner:user._id})
    next()
})

userSchema.pre('save',async function(next){
    const user=this
    console.log("just before saving. hashing the password")
    console.log("userPWs ",user)
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
    }

    next()
})

// when we are passing a mongoose model we are passing an object in as the second argument to model. Now when we pass th eobject as second arugument behind the scenes the mongoose converts it into what known as a SCHEMA in order to take the advantage of middleware functionality all we have to do is create the schema first and pass that in. e.g we can see in revise workspace
const User=mongoose.model('User',userSchema)

// const me=new User({
//     name:'Gowtham  ',
//     email:'Gowtham@gmail.com',
//     password:'pd123asdxc      ',
// })

// me.save().then((me)=>{
//     console.log(me);
// }).catch((err)=>{
//  console.log("error", err)
// })

module.exports=User