const { ObjectId } = require("mongodb");
const { connectDB } = require("../connection");

let UpdateAdminAds = async (req, res) => {
  try {
    let db = await connectDB();
    let collection = db.collection("ads");

    let { ad_id, title, description, image, active } = req.body;

    if (!ad_id || !ObjectId.isValid(ad_id)) {
      return res.status(400).send({
        success: false,
        message: "Valid Ad ID is required",
      });
    }

    let update = {
      updatedAt: new Date(),
    };

    if (title !== undefined) update.title = title;
    if (description !== undefined) update.description = description;
    if (image !== undefined) update.image = image;
    if (active !== undefined) update.active = active;

    let updateAd = await collection.updateOne(
      { _id: ObjectId.createFromHexString(ad_id) },
      { $set: update },
    );

    if (updateAd.matchedCount === 0) {
      return res.status(404).send({
        success: false,
        message: "Ad Not Found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Ad updated successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { UpdateAdminAds };