const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pollSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    poller: {
      type: String,
      required: true,
    },
    body: {
      type: String,
    },
    options: {
      type: Array,
      required: true,
    },
    votedIPAddresses: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Poll", pollSchema);
