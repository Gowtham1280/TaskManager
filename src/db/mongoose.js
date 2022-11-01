const validator=require('validator')
const mongoose=require('mongoose')


mongoose.connect(process.env.DATA_BASE_URL,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology: true,
})


// const task=mongoose.model('task',{
//     description:{
//         type:String,
//         trim:true,
//         required:true,
//     },
//     completed:{
//         type:Boolean,
//         default:false,
//     },
// })

// const me=new task({
//     description:"i am very fast in Nodejs",
    
// })



// me.save().then(()=>{
//     console.log(me)
// }).catch((err)=>{
//     console.log(err)
// })





// const User=mongoose.model('User',{
//     name:{
//         type:String,
//         required:true,
//         trim:true,
//     },
//     password:{
//         type:String,
//         required:true,
//         trim:true,
//         lowercase:true,
//         minlength:6,
//         validate(value){
//             if(value.includes("password")){
//                 throw new Error("password cannot contain password");
//             }
//         },

//     },
//     email:{
//         type:String,
//         lowercase:true,
//         validate(email){
//             if(!validator.isEmail(email)){
//                 throw new Error("invalid email");
//             }
//         },
//     },
// })


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

// module.exports=User



























