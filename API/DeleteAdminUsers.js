const { ObjectId } = require("mongodb");
const { connectDB } = require("../connection");

let DeleteAdminUsers = async (req, res) => {
  try {
    let db = await connectDB();
    let collection = db.collection("users");

    let { user_id } = req.params;

    if (!ObjectId.isValid(user_id)) {
      return res.status(400).send({
        success: false,
        message: "Valid User ID is required",
      });
    }

    let removeUser = await collection.deleteOne({
      _id: ObjectId.createFromHexString(user_id),
    });

    if (removeUser.deletedCount > 0) {
      return res.status(200).send({
        success: true,
        message: "User deleted successfully",
      });
    }

    return res.status(404).send({
      success: false,
      message: "User Not Found",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { DeleteAdminUsers };