const { ObjectId } = require("mongodb");
const { connectDB } = require("../connection");

let DeleteAdminArtists = async (req, res) => {
  try {
    let db = await connectDB();
    let collection = db.collection("artists");

    let { artist_id } = req.params;

    if (!ObjectId.isValid(artist_id)) {
      return res.status(400).send({
        success: false,
        message: "Valid Artist ID is required",
      });
    }

    let removeArtist = await collection.deleteOne({
      _id: ObjectId.createFromHexString(artist_id),
    });

    if (removeArtist.deletedCount > 0) {
      return res.status(200).send({
        success: true,
        message: "Artist deleted successfully",
      });
    }

    return res.status(404).send({
      success: false,
      message: "Artist Not Found",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { DeleteAdminArtists };