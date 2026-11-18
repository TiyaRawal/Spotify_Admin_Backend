const { connectDB } = require("../connection");

let AddAdminBrowseCategory = async (req, res) => {
  try {
    let db = await connectDB();
    let collection = db.collection("BrowseCategory");

    let { title, image, color } = req.body;

    if (!title || !image || !color) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    let insertCategory = await collection.insertOne({
      title,
      image,
      color,
      created_at: new Date(),
    });

    if (insertCategory.acknowledged) {
      return res.status(200).send({
        success: true,
        message: "Category added successfully",
        category_id: insertCategory.insertedId,
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

module.exports = { AddAdminBrowseCategory };