require('../src/db/mongoose')
const Task=require('../src/models/tasks')


//.findByIdAndDelete(),.countDocuments()


// Task.findByIdAndDelete('626d01247f88b14f88821043',{completed:true}).then((task)=>{
//     console.log(task)
//     return Task.countDocuments({completed:false})
// }).then((result)=>{
//  console.log(result)
// }).catch((e)=>{
//     console.log(err)
// })

const findByIdAndDelete= async (id)=>{
   const task=await Task.findByIdAndDelete(id)
   const count=await Task.countDocuments({completed:true})
   return{
      count,
      task
   } 
}

findByIdAndDelete('626d01247f88b14f88821043').then((...ans)=>{
   console.log(...ans)
}).catch((e)=>{
   console.log(e)
})

































// Task.findByIdAndUpdate('626d01247f88b14f88821043',{completed:true}).then((task)=>{
//     console.log(task)
//     return Task.countDocuments({completed:true})
// }).then((result)=>{
//  console.log(result)
// }).catch((e)=>{
//     console.log(err)
// })

// const findByIdAndUpdate=async (id,completed)=>{
//    const found=await Task.findByIdAndUpdate(id,completed)
//    const updated=await Task.countDocuments({completed:false})
//    return{found,updated}
// }

// findByIdAndUpdate('626d0028fd94501878998723',{completed:true}).then((...ans)=>{
//    console.log(...ans)
// }).catch((e)=>{
//    console.log(e)
// })







