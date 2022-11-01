// const add=(a,b)=>{
//     return new Promise((resolve,reject)=>{
//        setTimeout(()=>{
//           resolve(a+b)
//        },3000)
//     })
//   }
  
//   const doAsync=async ()=>{
//      const res=await add(1,2)
//      const res2=await add(res,3)
//      console.log(res2)
//   }
  
//   console.log("Before")
//   doAsync()
//   console.log("After")
  

  // const doSomethingAsync = () => {
//     return new Promise(resolve => {
//       setTimeout(() =>
//         resolve('I did something')
//        ,3000)
//     })
//   }
  
//   const doSomething = async () => {
//    const res= await doSomethingAsync()
//    console.log(res)
//   }
  
//   console.log('Before')
//   doSomething()
//   console.log('After')




//  function f(name){
//    return new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//       reject(name)
//     },5000)
//    })
//   }

//   console.log('Before')
//   f("gowtham").then(function(res){
//     console.log(res)
//   }).catch((e)=>{
//     console.log(e)
//   })
//   console.log('After')


// function add(a,b,callback){
//      callback(a+b)


// }

// add(1,2,(res,err)=>{
//    if(res)
//       console.log(res)
//    else{
//       console.log(err)
//    }
// })

// function add(a,b){
//    return new Promise((res,rej)=>{
//       const sum=a+b;
//       if(a&&b>0){
//          return res(sum+3)
//       }
//       rej("be possitive bro")
//    })
// }

// add(2,-3).then((ans)=>[
//    console.log(ans)
// ]).catch((e)=>[
//    console.log(e)
// ])



async function add(a,b){
  const one= await (a+b);
  const two=await (one+2)
  const three=await (two+5)
  return[three,one,two]
}

add(1,2).then(([three,...res])=>{
   console.log([three,...res])
})