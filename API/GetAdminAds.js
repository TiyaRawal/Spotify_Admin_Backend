const { connectDB } = require("../connection");

let GetAdminAds = async (req, res) => {
  try {
    let db = await connectDB();
    let collection = db.collection("ads");

    let ads = await collection.find({}).toArray();

    if (ads.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Ads Not Found",
      });
    }

    return res.status(200).send({
      success: true,
      ads: ads,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { GetAdminAds };