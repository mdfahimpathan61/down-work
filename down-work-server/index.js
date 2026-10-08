const express = require('express')
require('dotenv').config()


const app = express()
const cors = require('cors')
const { MongoClient, ObjectId } = require('mongodb')
const admin = require("firebase-admin");
const port = process.env.PORT || 3000


app.use(cors())
app.use(express.json())



const serviceAccount = require("./down-work-9-firebase-adminsdk.json");
const { getAuth } = require('firebase-admin/auth')

admin.initializeApp({
  credential: admin.cert(serviceAccount)
});
//console.log("admin --> ",admin.credential)

const firebaseVerification = async(req,res,next) =>{
// console.log("hello , i am form firebaseVerification middleware")
 const authorization = req.headers.authorization
 //console.log(authorization)

 if(!authorization){
    return res.status(401).send({message : "Unauthorize Access"})
 }

 const token = authorization.split(" ")[1]
 if(!token){
    return res.status(401).send({message : "Unauthorize Access"})
 }
 //console.log(token)

 const decode =await getAuth().verifyIdToken(token)
 //console.log(decode)
 if(decode){
    const tokenEmail = decode.email
 //console.log(tokenEmail)
 req.headers.token_email = tokenEmail
 next()
 }
 else{
    res.status(401).send({message : "Unauthorize Access"})
 }
}


const client = new MongoClient(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.5xpfw1y.mongodb.net/?appName=Cluster0`)



 async function connectToMongoDB() {
    try{
        await client.connect();
        

        const database = client.db('downwork_database')
        const postedJobs = database.collection("postedJobs")
        const category = database.collection("downWork_category")
        const users = database.collection("downWork_users")
        const appliedJobs = database.collection("applied_jobs")

        app.post("/jobpost",async (req,res)=>{
            const newJob = req.body
            const inserAJob = await postedJobs.insertOne(newJob)
            res.send(inserAJob)
        })
        app.post("/categorypost", async(req,res) =>{
            const newCategory = req.body
            const inserACategory = await category.insertMany(newCategory)
            res.send(inserACategory)
        })

        app.post("/user", async(req,res) =>{
            const newUser = req.body
            
            const query = {email: newUser.email}
            const update = {$set : newUser}
            const option = {upsert : true}
            const insertAUser = await users.updateOne(query, update, option)
            res.send(insertAUser)
        })

        app.post('/applyjob', async(req,res) =>{
            const newApplyedJob = req.body
            const payload = {
                freelancer_id : new ObjectId(newApplyedJob.freelancer_id),
                job_id : new ObjectId(newApplyedJob.job_id),
                 email: newApplyedJob.email,
                 status : "pending",
                 applied_date : new Date()
            }
            const query = {freelancer_id : newApplyedJob.freelancer_id, job_id : newApplyedJob.job_id}
            const existingApplication =  await appliedJobs.findOne(query)
            if(existingApplication){
               return res.status(400).send({message : "Already Applyed"})
            }
            const insertApplyJob = await appliedJobs.insertOne(payload)
            res.send(insertApplyJob)
        })
        

        app.patch('/updatejob', async(req,res) =>{
            const id = req.query.id
            const updatedJob = req.body
            //console.log(id)
            console.log(updatedJob)
            const query = {_id : new ObjectId(id)}
            const update = { $set : updatedJob}
            const result = await postedJobs.updateOne(query, update)
            res.send(result)
        })

        app.patch('/updateuser', async(req,res) =>{
            const updateUser = req.body
             const id = req.query.id
             const query = {_id : new ObjectId(id)}
             const update = {$set : updateUser}
             const result = await users.updateOne(query, update)
             res.send(result)
        })

        app.patch('/application', async(req,res) => {
            const applicationId = req.query.id
            console.log(applicationId)
            const newInfo = req.body
            const query = {_id : new ObjectId(applicationId)}
            const update ={$set : newInfo}
            const result = await appliedJobs.updateOne(query,update)
            res.send(result)
        })
        


        app.get('/jobs', async(req,res) => {
            
            if(req.query.id){
                const id = req.query.id
                
                const query = {_id : new ObjectId(id)}
                const result =await postedJobs.findOne(query)
                //console.log(result)
                if(result){
                    res.send(result)
                }
                else{
                    res.status(404).send({message : "Job not found"})
                }
                
            }
             else{
                const cursor =await postedJobs.find().toArray()
             res.send(cursor)
             }
        })
        app.get('/category', async(req,res) => {
            const cursor = await category.find().toArray()
            res.send(cursor)
        })
        app.get("/user", async(req,res) => {
            const freelancerId = req.query.id 
            if(freelancerId){
                const query = {_id : new ObjectId(freelancerId)}
                const result = await users.findOne(query)
                return res.send(result)
            }

            const email = req.query.email
            //const role = req.query.role
            //console.log(email)
            const query = {email : email}
            const result =await users.findOne(query)
            if(!result){
                res.status(404).send({message : "User not found"})
                return
            }
            res.send(result)
        })
        app.get('/myjobs', async(req,res) => {
            const email = req.query.email
            const query = {client : email}
            const projectField = {_id:1, location:1, title : 1,jobType:1, posted_date : 1, vacancy : 1, status:1,  }
            const cursor =  postedJobs.find(query).project(projectField)
            const result = await cursor.toArray()
            res.send(result)
        })

        

        app.get('/applyed', async(req, res) =>{
            const email = req.query.email
            const id = req.query.id
            //console.log(email, id)
            const query = {
                email : email,
                job_id : new ObjectId(id)
            }
            const result = await appliedJobs.findOne(query)
            console.log(result)
            res.send(result)
        })

        app.get('/myappliedjobs',firebaseVerification, async(req, res) => {
            //console.log("from __-->",req.headers.token_email)
           // const tokenEmail = req.headers.token_email
            const email = req.query.email
            // if(tokenEmail != email){
            //    //  return res.status(403).send({message : "Forbidden Access"})
            // }
            const query = {email : email}
            //console.log(email)

            const freelancer = await users.findOne(query)
            if(!freelancer){
                return res.status(404).send({message :"User not found"})
            }
            //console.log(freelancer)

            const result = await appliedJobs.find({freelancer_id : freelancer._id}).toArray()
            console.log(result)

            

            const application = await appliedJobs.aggregate([
                {
                    $match:{
                        freelancer_id: freelancer._id,
                    }
                },
                {
                    $lookup : {
                        from : "postedJobs",
                        localField : "job_id",
                        foreignField : "_id",
                        as : "job"
                    }
                },
                {
                    $unwind : "$job"
                }

            ]).toArray()
            res.send(application)
             })
//             const result3 = await appliedJobs.aggregate([
//   {
//     $match: {
//       freelancer_id: freelancer._id
//     }
//   },
//   {
//     $lookup: {
//       from: "postedJobs",
//       localField: "job_id",
//       foreignField: "_id",
//       as: "job"
//     }
//   }
// ]).toArray();

// console.log("STEP 3:", result3);

            //console.log(application[0].jobs)

            app.get('/jobapplications',async(req, res)=>{
                const jobId = req.query.id
                
                

                const applications = await appliedJobs.aggregate([
                    {
                        $match : {
                            job_id : new ObjectId(jobId)
                        }
                    },

                    {
                        $lookup : {
                            from : "downWork_users",
                            localField : "freelancer_id",
                            foreignField : "_id",
                            as : "freelancer"
                        }


                    },
                    {
                        $unwind : "$freelancer"
                    }
                ]).toArray()

                //console.log(applications)
                

                const job = await postedJobs.findOne({_id : new ObjectId(jobId)})
               // console.log(job)

                res.send({applications, job})
            })
            

            
       

        app.delete('/deletemyjob', async(req,res) =>{
                const id = req.query.id
                const email = req.query.email
                console.log(id, email)
                const query = {_id : new ObjectId(id), client:email}
                const result = await postedJobs.deleteOne(query)
                res.send(result)
            })



        console.log("You successfully connected to MongoDB!");
        return client
    }
    catch(err){
        console.dir(err)
    }
}
connectToMongoDB()


app.get("/", (req,res) =>{
    res.send("Down down work")
})

app.listen(port,() =>{
    console.log(`Example app listening on port ${port}`)
} )