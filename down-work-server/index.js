const express = require('express')
require('dotenv').config()

const app = express()
const cors = require('cors')
const { MongoClient } = require('mongodb')
const port = process.env.PORT || 3000


app.use(cors())
app.use(express.json())


const client = new MongoClient(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.5xpfw1y.mongodb.net/?appName=Cluster0`)

 async function connectToMongoDB() {
    try{
        await client.connect();
        

        const database = client.db('downwork_database')
        const postedJobs = database.collection("postedJobs")
        const category = database.collection("downWork_category")
        const users = database.collection("downWork_users")

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

        


        app.get('/jobs', async(req,res) => {
             const cursor =await postedJobs.find().toArray()
             res.send(cursor)
        })
        app.get('/category', async(req,res) => {
            const cursor = await category.find().toArray()
            res.send(cursor)
        })
        app.get("/user", async(req,res) => {
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