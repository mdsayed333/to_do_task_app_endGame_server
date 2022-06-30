const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

app.use(cors());
app.use(express.json());

/**
 toDo_app_endgame
 2CmIT9vccVEdaIF6
 * 
 */

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.i3kvt.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// client.connect((err) => {
//   const collection = client.db("test").collection("devices");
//   console.log("MongoDB is running.......");
//   // perform actions on the collection object
//   client.close();
// });

async function run() {
  try {
    await client.connect();
    const taskCollection = client.db("todo-task").collection("task");
    const completeTaskCollection = client.db("todo-task").collection("complete-task");

    console.log("MongoDB is running.......");


    app.get("/task", async (req, res) => {
      const tasks = await taskCollection.find().toArray();
      res.send(tasks);
    });

    app.post("/task", async (req, res) => {
      const task = req.body;
      const result = await taskCollection.insertOne(task);
      res.send(result);
    });

    app.post("/complete", async (req, res) => {
      const task = req.body;
      const result = await completeTaskCollection.insertOne(task);
      res.send(result);
    });



  } finally {
  }
}

run().catch(console.dir);











app.get("/", (req, res) => {
  res.send("Hello from To Do Task app!");
});

app.listen(port, () => {
  console.log(`To Do Task app listening on port ${port}`);
});
