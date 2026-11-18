const { connectDB } = require("../connection");

let GetAdminBrowseCategory = async (req, res) => {
  try {
    let db = await connectDB();
    let collection = db.collection("BrowseCategory");

    let categories = await collection.find({}).toArray();

    if (categories.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Categories Not Found",
      });
    }

    return res.status(200).send({
      success: true,
      categories: categories,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { GetAdminBrowseCategory };