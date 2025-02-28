const Poll = require("../models/pollModel.js");

// get all

const getAll = async (req, res) => {
  const allPolls = await Poll.find({}).sort({ createdAt: -1 });

  if (!allPolls) {
    return res.status(404).json({ error: "could not GET" });
  }

  res.status(200).json(allPolls);
};

// get one by id

const getPoll = async (req, res) => {
  const id = req.params.id;

  const poll = await Poll.findById(id);

  if (!poll) {
    return res.status(404).json({ error: "poll not found" });
  }
  res.status(200).json(poll);
};

// post // new poll
const createPoll = async (req, res) => {
  const { title, poller, body, options } = req.body;

  try {
    const poll = await Poll.create({ title, poller, body, options });
    res.status(200).json(poll);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

// delete

const deletePoll = async (req, res) => {
  const id = req.params.id;

  const poll = await Poll.findOneAndDelete({ _id: id });

  if (!poll) {
    return res.status(404).json({ error: "poll not found" });
  }
  res.status(200).json(poll);
};

// patch

const updatePoll = async (req, res) => {
  const id = req.params.id;

  const poll = await Poll.findOneAndUpdate({ _id: id }, req.body);

  if (!poll) {
    return res.status(404).json({ error: "poll not found" });
  }

  res.status(200).json(poll);
};

module.exports = { createPoll, getPoll, getAll, deletePoll, updatePoll };
