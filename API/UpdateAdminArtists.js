const { ObjectId } = require("mongodb");
const { connectDB } = require("../connection");

let UpdateAdminArtists = async (req, res) => {
  try {
    let db = await connectDB();
    let collection = db.collection("artists");

    let {
      artist_id,
      name,
      image,
      coverImage,
      category,
      followers,
      artistPick,
      popularSongs,
    } = req.body;

    if (!artist_id || !ObjectId.isValid(artist_id)) {
      return res.status(400).send({
        success: false,
        message: "Valid Artist ID is required",
      });
    }

    let update = {
      updated_at: new Date(),
    };

    if (name !== undefined) update.name = name;
    if (image !== undefined) update.image = image;
    if (coverImage !== undefined) update.coverImage = coverImage;
    if (category !== undefined) update.category = category;
    if (followers !== undefined) update.followers = followers;
    if (artistPick !== undefined) update.artistPick = artistPick;

    if (popularSongs !== undefined) {
      if (!Array.isArray(popularSongs)) {
        return res.status(400).send({
          success: false,
          message: "Popular songs must be an array",
        });
      }

      update.popularSongs = popularSongs;
    }

    let updateArtist = await collection.updateOne(
      { _id: ObjectId.createFromHexString(artist_id) },
      { $set: update },
    );

    if (updateArtist.matchedCount === 0) {
      return res.status(404).send({
        success: false,
        message: "Artist Not Found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Artist updated successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { UpdateAdminArtists };