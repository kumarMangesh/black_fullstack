const mongoose = require("mongoose");

const dashboardSchema = new mongoose.Schema({
  intensity: {
    type: Number,
  },
  likelihood: {
    type: Number,
  },
  relevance: {
    type: Number,
  },
  added: {
    type: String,
  },
  published: {
    type: String,
  },
  country: {
    type: String,
  },
  region: {
    type: String,
  },
  topic: {
    type: String,
  },
  end_year: {
    type: String,
  },
  sector: {
    type: String,
  },
  insight: {
    type: String,
  },
  url: {
    type: String,
  },
  impact: {
    type: String,
  },
  pestle: {
    type: String,
  },
  source: {
    type: String,
  },
  title: {
    type: String,
  },
}, { versionKey: false });

module.exports = mongoose.model("blackcoffer", dashboardSchema);
