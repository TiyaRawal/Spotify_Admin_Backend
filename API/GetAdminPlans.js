
const { connectDB } = require("../connection");

let GetAdminPlans = async (req, res) => {
  try {
    let db = await connectDB();
    let collection = db.collection("plans");

    let plans = await collection.find({}).toArray();

    return res.status(200).send({
      success: true,
      plans
    });

  } catch (e) {
    console.log(e);

    return res.status(500).send({
      success: false,
      message: "Internal Server Error"
    });
  }
};

module.exports = { GetAdminPlans };