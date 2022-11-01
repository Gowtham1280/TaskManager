// // const mongodb=require('mongodb')  // npm i mongodb@3.1.10
// // const MongoClient=mongodb.MongoClient //  provides connecting methods to database
// const {MongoClient,ObjectId}=require('mongodb')

// const connectionURL='mongodb://127.0.0.1:27017'
// const databaseName='taskmanager'

// // const id=new ObjectId()

// // console.log(id.getTimestamp())
// // console.log(id.toString())


// MongoClient.connect(connectionURL,{useNewUrlParser:true},(err,client)=>{
//     if(err){
//         return console.log("unable to connect to database")
//     }
//     console.log("connected to database")
//     const db=client.db(databaseName)

//     // db.collection('users').insertOne({
//     //     name:'Gowthamkumar',
//     //     sub:"mongoDB"
//     // },(error,result)=>{
//     //     if(error){
//     //         return console.log("unable to add data")
//     //     }
//     //     console.log(result.ops)
//     // })
//     db.collection('tasks').insertMany([
//         {
//             name:"Photo-Shoot",
//             status:"Incomplte"
//         },
//         {
//             name:"Songs-Track",
//             status:"complted"
//         },
//         {
//             name:"charging",
//             status:"Incomplte"
//         }
//     ],(error,result)=>{
//         if(error){
//             return console.log(error)
//         }
//         console.log(result.ops)
//     })
// // db.collection("tasks").findOne({status:'complted'},(err,res)=>{
// //     console.log(res)
// // })

// // db.collection('tasks').find(new ObjectId('6266253b29d6fb0ac0a47756')).toArray((err,res)=>{
// //     console.log(res)
// // })

// // db.collection('tasks').find({status:'Incomplte'}).count((err,res)=>{
// //     console.log(res)
// // })

// // db.collection('tasks').find({status:'Incomplte'}).toArray((err,res)=>{
// //     console.log(res)
// // })

// // db.collection("tasks").updateMany({_id:ObjectId("6266253b29d6fb0ac0a47758"),_id:ObjectId("6266253b29d6fb0ac0a47756")},{
// //     $set:{
// //         status:'completed'
// //     }
// // }).then((response)=>{
// //     console.log(response)
// // }).catch((error)=>{
// //     console.log(error)
// // })


// // db.collection("tasks").deleteMany({name:"Hems"},{name:'Gowtham'})
// // .then(res=>{
// //     console.log(res)
// // }).catch(err=>{
// //     console.log(err)
// })





