const { connectDB } = require("../connection");

let AddAdminAds = async (req, res) => {
  try {
    let db = await connectDB();
    let collection = db.collection("ads");
    let { title, description, image, active } = req.body;
    if (!title || !description || !image) {
      return res.status(400).send({success: false, message: "All fields are required"});
    }

    let insertAd = await collection.insertOne({
      title,
      description,
      image,
      active: active !== undefined ? active : true,
      createdAt: new Date(),
    });

    if (insertAd.acknowledged) {
      return res.status(201).send({
        success: true,
        message: "Ad added successfully",
        ad_id: insertAd.insertedId,
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { AddAdminAds };