const express = require("express");
const jobRouter = express.Router();
const JobModel = require("../Model/job.model");

jobRouter.post("/add", async (req, res) => {
  try {
    const job = JobModel(req.body);
    await job.save();
    res.status(200).send("Successfully added Data");
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

jobRouter.get("/", async (req, res) => {
  try {
    payload = req.body;
    const job = await JobModel.find(payload);
    res.status(200).send({ Jobs: job });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});





jobRouter.get('/filter', async (req, res) => {
  const { role } = req.query;

  try {
    const jobs = await JobModel.find({ role });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


jobRouter.get('/sort', async (req, res) => {
  try {
    const jobs = await JobModel.find().sort({ postedDate: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


jobRouter.get('/search', async (req, res) => {
  const { techstack } = req.query;

  try {
    const jobs = await JobModel.find({ techstack: { $regex: techstack, $options: 'i' } });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});






module.exports = { jobRouter };
