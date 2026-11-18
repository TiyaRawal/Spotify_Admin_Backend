const { ObjectId } = require("mongodb");
const { connectDB } = require("../connection");

let DeleteAdminAds = async (req, res) => {
  try {
    let db = await connectDB();
    let collection = db.collection("ads");

    let { ad_id } = req.params;

    if (!ObjectId.isValid(ad_id)) {
      return res.status(400).send({
        success: false,
        message: "Valid Ad ID is required",
      });
    }

    let removeAd = await collection.deleteOne({
      _id: ObjectId.createFromHexString(ad_id),
    });

    if (removeAd.deletedCount > 0) {
      return res.status(200).send({
        success: true,
        message: "Ad deleted successfully",
      });
    }

    return res.status(404).send({
      success: false,
      message: "Ad Not Found",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { DeleteAdminAds };