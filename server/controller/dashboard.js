const asyncHandler = require("express-async-handler");
const dashboardJson = require("../jsondata.json");

const dashboardSchema = require("../Model/Dashboard");

const getDashboard = asyncHandler(async (req, res) => {
  fetchData();
  const dashboardData = await dashboardSchema.find();
  res.status(200).json(dashboardData);
});

async function fetchData() {
  const data = await dashboardSchema.find(
    {},
    {
      __v: 0,
      __id: 0,
    }
  );
  if (data.length) {
    return;
  }
  dashboardJson.forEach((data) => {
    const payload = {
      intensity: data.intensity,
      likelihood: data.likelihood,
      relevance: data.relevance,
      added: data.added,
      published: data.published,
      country: data.country,
      region: data.region,
      topic: data.topic,
      end_year: data.end_year,
      sector: data.sector,
      insight: data.insight,
      url: data.url,
      start_year: data.start_year,
      impact: data.impact,
      pestle: data.pestle,
      source: data.source,
      title: data.title,
    };
    uploadData(payload);
  });
}

async function uploadData(data) {
  try {
    await dashboardSchema.findOneAndUpdate(
      {
        title: data.title,
      },
      data,
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getDashboard,
};
