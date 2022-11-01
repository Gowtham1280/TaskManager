const mongoose=require('mongoose')
const validator=require('validator')

const taskSchema=new mongoose.Schema({
    description:{
        type:String,
        trim:true,
        required:true,
    },
    completed:{
        type:Boolean,
        default:false,
    },
    owner:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'User',            // reference to the another model here it is User model type:mongoose.Schema.Types.ObjectId,

    }

},{
    timestamps:true
})



const task=mongoose.model('Task',taskSchema)

module.exports=task