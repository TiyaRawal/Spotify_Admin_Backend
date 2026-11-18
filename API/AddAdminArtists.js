const { connectDB } = require("../connection");

let AddAdminArtists = async (req, res) => {
  try {
    let db = await connectDB();
    let collection = db.collection("artists");

    let {
      name,
      image,
      coverImage,
      category,
      followers,
      artistPick,
      popularSongs,
    } = req.body;

    if (!name || !image) {
      return res.status(400).send({
        success: false,
        message: "Artist name and image are required",
      });
    }

    let insertArtist = await collection.insertOne({
      name,
      image,
      coverImage: coverImage || "",
      category: category || "Popular Artists",
      followers: followers || "0 monthly listeners",
      artistPick: artistPick || "",
      popularSongs: Array.isArray(popularSongs) ? popularSongs : [],
      created_at: new Date(),
    });

    if (insertArtist.acknowledged) {
      return res.status(200).send({
        success: true,
        message: "Artist added successfully",
        artist_id: insertArtist.insertedId,
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

module.exports = { AddAdminArtists };