const { ObjectId } = require("mongodb");
const { connectDB } = require("../connection");

let DeleteAdminSongs = async (req, res) => {
  try {
    let db = await connectDB();
    let collection = db.collection("songs");

    let { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Valid Song ID is required",
      });
    }

    let removeSong = await collection.deleteOne({
      _id: ObjectId.createFromHexString(id),
    });

    if (removeSong.deletedCount > 0) {
      return res.status(200).send({
        success: true,
        message: "Song deleted successfully",
      });
    } else {
      return res.status(404).send({
        success: false,
        message: "Song not found",
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

module.exports = { DeleteAdminSongs };