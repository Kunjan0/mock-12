const express = require("express");
const app = express();
const connection = require("./db");


const { jobRouter } = require("./Routes/job.route");
const cors = require("cors");
require("dotenv").config();



app.use(cors());
app.use(express.json());


app.use("/", jobRouter);


app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Port 8080 is running");
  } catch (err) {
    console.log("cannot connect to the db");
  }
})

