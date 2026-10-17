const express = require("express");
require("dotenv").config();

const app = express();
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const serviceAccount = require("./down-work-9-firebase-adminsdk.json");
const { getAuth } = require("firebase-admin/auth");
const { initializeApp, cert } = require("firebase-admin/app");

// admin.initializeApp({
//   credential: admin.cert(serviceAccount),
// });
//console.log("admin --> ",admin.credential)
initializeApp({
  credential: cert(serviceAccount),
});

const firebaseVerification = async (req, res, next) => {
  // console.log("hello , i am form firebaseVerification middleware")
  const authorization = req.headers.authorization;
  //console.log(authorization)

  if (!authorization) {
    return res.status(401).send({ message: "Unauthorize Access" });
  }

  const token = authorization.split(" ")[1];
  if (!token) {
    return res.status(401).send({ message: "Unauthorize Access" });
  }
  //console.log(token)

  const decode = await getAuth().verifyIdToken(token);
  //console.log(decode)
  if (decode) {
    const tokenEmail = decode.email;
    //console.log(tokenEmail)
    req.headers.token_email = tokenEmail;
    next();
  } else {
    res.status(401).send({ message: "Unauthorize Access" });
  }
};

const client = new MongoClient(
  `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.5xpfw1y.mongodb.net/?appName=Cluster0`,
);

async function connectToMongoDB() {
  try {
    await client.connect();

    const database = client.db("downwork_database");
    const postedJobs = database.collection("postedJobs");
    const category = database.collection("downWork_category");
    const users = database.collection("downWork_users");
    const appliedJobs = database.collection("applied_jobs");

    app.post("/jobpost",firebaseVerification, async (req, res) => {
      const clientEmail = req.query.clientemail
      const tokenEmail = req.headers.token_email
      if(clientEmail != tokenEmail){
        res.status(403).send({message : "Forbidden Access"})
      }
      const newJob = req.body;
      const inserAJob = await postedJobs.insertOne(newJob);
      res.send(inserAJob);
    });
    app.post("/categorypost", async (req, res) => {
      const newCategory = req.body;
      const inserACategory = await category.insertMany(newCategory);
      res.send(inserACategory);
    });

    app.post("/user", async (req, res) => {
      const newUser = req.body;

      const query = { email: newUser.email };
      const update = { $set: newUser };
      const option = { upsert: true };
      const insertAUser = await users.updateOne(query, update, option);
      res.send(insertAUser);
    });

    app.post("/applyjob", async (req, res) => {
      const newApplyedJob = req.body;
      console.log(newApplyedJob)
      const payload = {
        freelancer_id: new ObjectId(newApplyedJob.freelancer_id),
        job_id: new ObjectId(newApplyedJob.job_id),
        email: newApplyedJob.email,
        status: "pending",
        applied_date: new Date(),
      };
      const query = {
        freelancer_id: newApplyedJob.freelancer_id,
        job_id: newApplyedJob.job_id,
      };
      const existingApplication = await appliedJobs.findOne(query);
      if (existingApplication) {
        return res.status(400).send({ message: "Already Applyed" });
      }
      const insertApplyJob = await appliedJobs.insertOne(payload);
      res.send(insertApplyJob);
    });

    app.patch("/updatejob", firebaseVerification, async (req, res) => {
      const id = req.query.id;
      const clientEmail = req.query.email;
      const tokenEmail = req.headers.token_email;
      //console.log(clientEmail, tokenEmail);

      if (clientEmail != tokenEmail) {
        return res.status(403).send.apply({ message: "Forbidden Access" });
      }
      const updatedJob = req.body;
      //console.log(id)
      //console.log(updatedJob)
      const query = { _id: new ObjectId(id), client: clientEmail };
      const update = { $set: updatedJob };
      const result = await postedJobs.updateOne(query, update);
      res.send(result);
    });

    app.patch("/updateuser",firebaseVerification, async (req, res) => {
      const clientEmail = req.query.clientemail;
      const tokenEmail = req.headers.token_email;
      //console.log(clientEmail, tokenEmail);

      if (clientEmail != tokenEmail) {
        return res.status(403).send.apply({ message: "Forbidden Access" });
      }
      const updateUser = req.body;
      const id = req.query.id;
      const query = { _id: new ObjectId(id) };
      const update = { $set: updateUser };
      const result = await users.updateOne(query, update);
      res.send(result);
    });

    app.patch("/application",firebaseVerification ,async (req, res) => {
      const clientEmail = req.query.clientemail 
      const tokenEmail =  req.headers.token_email
      if(clientEmail != tokenEmail){
        res.status(401).send({message : "Unauthorize Access"})
      }
      const applicationId = req.query.id;
      //console.log(applicationId);
      const newInfo = req.body;
      const query = { _id: new ObjectId(applicationId) };
      const update = { $set: newInfo };
      const result = await appliedJobs.updateOne(query, update);
      res.send(result);
    });

    app.get("/jobs", firebaseVerification, async (req, res) => {
      const id = req.query.id;
      const clientEmail = req.query.email;

      const tokenEmail = req.headers.token_email;
      if (tokenEmail != clientEmail) {
        return res.status(403).send({ message: "Forbidden Access" });
      }

      const query = { _id: new ObjectId(id), client: clientEmail };
      const result = await postedJobs.findOne(query);
      //console.log(result)
      if (result) {
        res.send(result);
      } else {
        res.status(404).send({ message: "Job not found" });
      }
    });

    app.get("/getjobs", async (req, res) => {
      const {
        limit = 0,
        skip = 0,
        id,
        featured,
        sortvalue = "posted_date",
        sortorder = -1,
        searchtext,
        filterjobs,
      } = req.query;
      //console.log(limit, skip)
      //console.log(featured)
      let query = {};
      if (id != "all") {
        query.category_id = id;
      }
      if (featured) {
        query.featured = true;
      }
      
      if (searchtext?.trim()) {
        const words = searchtext?.trim().split(/\s+/);
        query.$and = words.map((word) => ({
          $or: [
            { title: { $regex: word, $options: "i" } },
            { "company.name": { $regex: word, $options: "i" } },
            { "company.industry": { $regex: word, $options: "i" } },
            { job_type: { $regex: word, $options: "i" } },
          ],
        }));
      }
      //console.log(filterjobs)

      if (filterjobs && filterjobs !== "null") {
        const filter = JSON.parse(filterjobs);
        //console.log("Filter received:", filterjobs);

        if (filter?.jobType && filter.jobType !== "all") {
          query.job_type = {
            $regex: `^${filter.jobType}$`,
            $options: "i",
          };
        }

        if (filter?.workMode && filter.workMode !== "all") {
          query["location.work_mode"] = {
            $regex: `^${filter.workMode}$`,
            $options: "i",
          };
        }

        if (filter?.industry && filter.industry !== "all") {
          query["company.industry"] = {
            $regex: `^${filter.industry}$`,
            $options: "i",
          };
        }

        if (filter?.location?.trim()) {
          query.$or = [
            { "location.city": { $regex: filter.location.trim(), $options: "i" } },
            { "location.country": { $regex: filter.location.trim(), $options: "i" } },
            { "location.address": { $regex: filter.location.trim(), $options: "i" } },
          ];
        }

        if (filter?.salary && Number(filter.salary) > 0) {
          query["salary.maximum"] = {
            $lte: Number(filter.salary),
          };
        }

        
      }

      const sortField = {};
      if (sortvalue == "Experience") {
        sortField["experience.minimum"] = sortorder;
      } else if (sortvalue == "Salary") {
        sortField["salary.minimum"] = sortorder;
      }
      //console.log(sortField)

      const projectField = {
        _id: 1,
        title: 1,
        company: 1,
        location: 1,
        job_type: 1,
        posted_date: 1,
        salary: 1,
        description: 1,
        experience: 1,
        category_id: 1,
        featured: 1,
      };
      //console.log("Final query:", JSON.stringify(query, null, 2));
      const cursor = postedJobs
        .find(query)
        .project(projectField)
        .limit(Number(limit))
        .skip(Number(skip))
        .sort(sortField);
      const jobsData = await cursor.toArray();

      const totalJobCount = await postedJobs.countDocuments(query);
      //console.log(totalJobCount)
      //console.log("Matched jobs:", jobsData.length);
      res.send({ jobsData, totalJobCount });
    });

    app.get("/jobdetails", async (req, res) => {
      const id = req.query.id;
      //console.log(id)
      const query = { _id: new ObjectId(id) };
      const result = await postedJobs.findOne(query);
      res.send(result);
    });

    app.get("/category", async (req, res) => {
      const cursor = await category.find().toArray();
      res.send(cursor);
    });
    app.get("/user", firebaseVerification, async (req, res) => {
      const email = req.query.email;
      const tokenEmail = req.headers.token_email;
      //console.log(email, tokenEmail)
      if (email != tokenEmail) {
        res.status(403).send({ message: "Forbidden Access" });
      }
      //const role = req.query.role
      //console.log(email)
      const query = { email: email };
      const result = await users.findOne(query);
      if (!result) {
        res.status(404).send({ message: "User not found" });
        return;
      }
      res.send(result);
    });

    app.get("/existinguser",async(req, res) =>{
        const email = req.query.email

        const query = {email : email}
        const result = await users.findOne(query)
       // console.log("user ",result)

        if(result){
            res.send({user:result, isExist : true})
        }
        else{
            res.send({user:result, isExist : false})
        }
        
    })

    app.get("/profile", async (req, res) => {
      const freelancerId = req.query.id;
      if (freelancerId) {
        const query = { _id: new ObjectId(freelancerId) };
        const result = await users.findOne(query);
        return res.send(result);
      }
    });

    app.get("/myjobs", firebaseVerification, async (req, res) => {
      const email = req.query.email;
      const query = { client: email };
      const tokenEmail = req.headers.token_email;
      if (email != tokenEmail) {
        res.status(403).send({ message: "Forbidden Access" });
      }
      const projectField = {
        _id: 1,
        location: 1,
        title: 1,
        jobType: 1,
        posted_date: 1,
        vacancy: 1,
        status: 1,
      };
      const cursor = postedJobs.find(query).project(projectField);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/applyed", async (req, res) => {
      const email = req.query.email;
      const id = req.query.id;
      //console.log(email, id)
      const query = {
        email: email,
        job_id: new ObjectId(id),
      };
      const result = await appliedJobs.findOne(query);
      //console.log(result)
      res.send(result);
    });

    app.get("/myappliedjobs", firebaseVerification, async (req, res) => {
      //console.log("from __-->",req.headers.token_email)
      // const tokenEmail = req.headers.token_email
      const email = req.query.email;
      // if(tokenEmail != email){
      //    //  return res.status(403).send({message : "Forbidden Access"})
      // }
      const tokenEmail = req.headers.token_email;
      if (email != tokenEmail) {
        res.status(403).send({ message: "Forbidden Access" });
      }
      const query = { email: email };
      //console.log(email)

      const freelancer = await users.findOne(query);
      if (!freelancer) {
        return res.status(404).send({ message: "User not found" });
      }
      //console.log(freelancer)

      const result = await appliedJobs
        .find({ freelancer_id: freelancer._id })
        .toArray();
      //console.log(result)

      const application = await appliedJobs
        .aggregate([
          {
            $match: {
              freelancer_id: freelancer._id,
            },
          },
          {
            $lookup: {
              from: "postedJobs",
              localField: "job_id",
              foreignField: "_id",
              as: "job",
            },
          },
          {
            $unwind: "$job",
          },
        ])
        .toArray();
      res.send(application);
    });
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

    app.get("/jobapplications",firebaseVerification, async (req, res) => {
      const clientEmail = req.query.clientemail
      const tokenEmail = req.headers.token_email
      if(clientEmail != tokenEmail){
        res.status(404).send({message : "Forbidden Access"})
      }
      const jobId = req.query.id;

      const applications = await appliedJobs
        .aggregate([
          {
            $match: {
              job_id: new ObjectId(jobId),
            },
          },

          {
            $lookup: {
              from: "downWork_users",
              localField: "freelancer_id",
              foreignField: "_id",
              as: "freelancer",
            },
          },
          {
            $unwind: "$freelancer",
          },
        ])
        .toArray();

      //console.log(applications)

      const job = await postedJobs.findOne({ _id: new ObjectId(jobId) });
      // console.log(job)

      res.send({ applications, job });
    });

    app.delete("/deletemyjob", firebaseVerification, async (req, res) => {
      const id = req.query.id;
      const email = req.query.email;
      const tokenEmail = req.headers.token_email;

      if (email != tokenEmail) {
        res.status(403).send({ message: "Forbidden Access" });
      }
      //console.log(id, email)
      const query = { _id: new ObjectId(id), client: email };
      const result = await postedJobs.deleteOne(query);
      res.send(result);
    });

    //console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    //console.dir(err);
  }
}

app.get("/test", (req, res) => {
  res.send("API routing works");
});

connectToMongoDB();

// app.get("/", (req, res) => {
//   res.send("Down down work");
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
module.exports = app;
