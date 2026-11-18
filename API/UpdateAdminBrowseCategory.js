const { ObjectId } = require("mongodb");
const { connectDB } = require("../connection");

let UpdateAdminBrowseCategory = async (req, res) => {
  try {
    let db = await connectDB();
    let collection = db.collection("BrowseCategory");

    let { category_id, title, image, color } = req.body;

    if (!category_id || !ObjectId.isValid(category_id)) {
      return res.status(400).send({
        success: false,
        message: "Valid Category ID is required",
      });
    }

    let update = {
      updated_at: new Date(),
    };

    if (title !== undefined) update.title = title;
    if (image !== undefined) update.image = image;
    if (color !== undefined) update.color = color;

    let updateCategory = await collection.updateOne(
      { _id: ObjectId.createFromHexString(category_id) },
      { $set: update },
    );

    if (updateCategory.matchedCount === 0) {
      return res.status(404).send({
        success: false,
        message: "Category Not Found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Category updated successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { UpdateAdminBrowseCategory };