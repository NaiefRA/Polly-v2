require("dotenv").config();
const pollRoutes = require("./routes/polls");
const express = require("express");
const mongoose = require("mongoose");
const Poll = require("./models/pollModel.js");
const cors = require("cors");

// app
const app = express();

// middle ware
app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.patch("/polls/:id/admin", async (req, res) => {
  const id = req.params.id;
  const { title, poller, options } = req.body;
  const poll = await Poll.findById(id);

  try {
    const update = await Poll.findOneAndUpdate(
      { _id: id },
      { title, poller, options },
      { new: true }
    );

    res.json(update);
  } catch (err) {
    res.status(400).json({ error: "Error" });
  }
});

app.patch("/polls/:id", async (req, res) => {
  const id = req.params.id;
  const { optionValue } = req.body;
  const rawIpAddress =
    req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const ipAddress = rawIpAddress.split(",")[0].trim();
  const poll = await Poll.findById(id);

  try {
    if (poll.votedIPAddresses.includes(ipAddress)) {
      return res
        .status(404)
        .json({ error: "You have already voted in this poll" });
    }

    const update = await Poll.findOneAndUpdate(
      { _id: id, "options.optionValue": optionValue },
      {
        $inc: { "options.$.optionVotes": 1 },
        $push: { votedIPAddresses: ipAddress },
      },
      { new: true }
    );

    res.json(update);
  } catch (err) {
    res.status(400).json({ error: "Error" });
  }
});

// routes

app.use("/polls", pollRoutes);

// connect to db

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listening
    app.listen(process.env.PORT, () => {
      console.log(`connected to db and listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
