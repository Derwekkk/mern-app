const mongoose = require("mongoose");

const DistributedListSchema = new mongoose.Schema(
  {
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
      required: true,
    },
    items: [
      {
        firstName: String,
        phone: String,
        notes: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("DistributedList", DistributedListSchema);
