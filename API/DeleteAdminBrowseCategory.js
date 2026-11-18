const { ObjectId } = require("mongodb");
const { connectDB } = require("../connection");

let DeleteAdminBrowseCategory = async (req, res) => {
  try {
    let db = await connectDB();
    let collection = db.collection("BrowseCategory");

    let { category_id } = req.params;

    if (!ObjectId.isValid(category_id)) {
      return res.status(400).send({
        success: false,
        message: "Valid Category ID is required",
      });
    }

    let removeCategory = await collection.deleteOne({
      _id: ObjectId.createFromHexString(category_id),
    });

    if (removeCategory.deletedCount > 0) {
      return res.status(200).send({
        success: true,
        message: "Category deleted successfully",
      });
    }

    return res.status(404).send({
      success: false,
      message: "Category Not Found",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { DeleteAdminBrowseCategory };